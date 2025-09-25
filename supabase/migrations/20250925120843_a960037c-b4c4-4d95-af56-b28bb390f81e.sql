-- Create table for WhatsApp leads
CREATE TABLE public.whatsapp_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  ip_address INET,
  source_page TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to insert WhatsApp leads
CREATE POLICY "Anyone can insert WhatsApp leads" 
ON public.whatsapp_leads 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins to view WhatsApp leads
CREATE POLICY "Only admins can view WhatsApp leads" 
ON public.whatsapp_leads 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Add index for performance
CREATE INDEX idx_whatsapp_leads_created_at ON public.whatsapp_leads(created_at);
CREATE INDEX idx_whatsapp_leads_phone ON public.whatsapp_leads(phone_number);