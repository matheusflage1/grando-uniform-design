-- Restructure natalia table for contact form data
DROP TABLE IF EXISTS public.natalia;

CREATE TABLE public.natalia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  funcionarios TEXT NOT NULL,
  estado TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.natalia ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert data (for contact form submissions)
CREATE POLICY "Anyone can insert contact data" 
ON public.natalia 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow admin access to view data (you can adjust this later)
CREATE POLICY "Allow all to view contact data" 
ON public.natalia 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_natalia_updated_at
BEFORE UPDATE ON public.natalia
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();