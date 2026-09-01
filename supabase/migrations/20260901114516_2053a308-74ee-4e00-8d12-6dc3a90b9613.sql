ALTER TABLE public.appointment_leads ADD COLUMN submission_key TEXT;

CREATE UNIQUE INDEX appointment_leads_submission_key_unique
ON public.appointment_leads (submission_key)
WHERE submission_key IS NOT NULL;