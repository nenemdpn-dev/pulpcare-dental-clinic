import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.25.76'

const SERVICES = [
  'General Dentistry',
  'Dental Cleaning',
  'Tooth Extraction',
  'Teeth Whitening',
  'Paediatric Dentistry',
  'Root Canal Treatment',
  'Cosmetic Dentistry',
  'Emergency Dental Care',
] as const

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
] as const

const BookingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal('')),
  phone: z.string().trim().regex(/^[+()\d\s-]{7,20}$/),
  service: z.enum(SERVICES),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  appointment_time: z.enum(TIME_SLOTS),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
  website: z.string().max(200).optional().default(''),
  form_started_at: z.number().int().positive(),
})

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
})

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const isValidAppointmentDate = (dateValue: string) => {
  const date = new Date(`${dateValue}T00:00:00Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateValue) return false
  const today = new Date()
  const todayValue = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  return date >= todayValue && date.getUTCDay() !== 0
}

const hashIp = async (ip: string, secret: string) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(ip))
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

const sendClinicEmail = async (booking: z.infer<typeof BookingSchema>, leadId: string) => {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  if (!resendKey) throw new Error('Email service is not configured')

  const details = [
    ['Name', booking.name],
    ['Phone', booking.phone],
    ['Email', booking.email || 'Not provided'],
    ['Service', booking.service],
    ['Preferred date', booking.appointment_date],
    ['Preferred time', booking.appointment_time],
    ['Additional message', booking.message || 'None'],
    ['Lead ID', leadId],
  ]

  const rows = details.map(([label, value]) => `<tr><td style="padding:8px 12px;font-weight:600;color:#0b3954;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#243746">${escapeHtml(value)}</td></tr>`).join('')
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Pulpcare Dental Clinic <onboarding@resend.dev>',
      to: ['pulpcaredentalnig@gmail.com'],
      subject: `New appointment request: ${booking.service}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#243746"><h1 style="color:#006b9c">New appointment request</h1><p>A patient submitted a booking request through the Pulpcare Dental Clinic website.</p><table style="border-collapse:collapse;width:100%;border:1px solid #dbe5ea">${rows}</table></div>`,
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    console.error(`Resend request failed [${response.status}]: ${details}`)
    throw new Error('Email notification failed')
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await request.json()
    const parsed = BookingSchema.safeParse(body)
    if (!parsed.success) return json({ error: 'Please check the booking details and try again.' }, 400)

    const booking = parsed.data
    const elapsed = Date.now() - booking.form_started_at
    if (booking.website || elapsed < 1500 || elapsed > 86_400_000) {
      return json({ ok: true, accepted: false })
    }
    if (!isValidAppointmentDate(booking.appointment_date)) {
      return json({ error: 'Please choose a valid future appointment date.' }, 400)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const hmacSecret = Deno.env.get('BOOKING_HMAC_SECRET')
    if (!supabaseUrl || !serviceRoleKey || !hmacSecret) return json({ error: 'Booking service is temporarily unavailable.' }, 503)

    const client = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } })
    const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const ip = forwardedFor || request.headers.get('cf-connecting-ip') || 'unknown'
    const sourceIpHash = await hashIp(ip, hmacSecret)
    const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const { count, error: countError } = await client
      .from('appointment_leads')
      .select('id', { count: 'exact', head: true })
      .eq('source_ip_hash', sourceIpHash)
      .gte('created_at', windowStart)
    if (countError) throw countError
    if ((count ?? 0) >= 5) return json({ error: 'Too many requests. Please try again later or call the clinic.' }, 429)

    const { data: lead, error: insertError } = await client
      .from('appointment_leads')
      .insert({
        name: booking.name,
        email: booking.email || null,
        phone: booking.phone,
        service: booking.service,
        appointment_date: booking.appointment_date,
        appointment_time: booking.appointment_time,
        message: booking.message || null,
        source_ip_hash: sourceIpHash,
      })
      .select('id')
      .single()
    if (insertError || !lead) throw insertError ?? new Error('Lead was not created')

    await sendClinicEmail(booking, lead.id)
    return json({ ok: true, lead_id: lead.id })
  } catch (error) {
    console.error('Appointment submission failed:', error)
    return json({ error: 'We could not submit your request right now. Please call the clinic or try again.' }, 500)
  }
})