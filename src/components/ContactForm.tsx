import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { formatPhone, isValidPhone } from '@/lib/phone';
import { track } from '@/lib/track';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const employeeRanges = ['10–30', '31–100', '101–300', '+300'];
const segments = ['Saúde', 'Indústria', 'Varejo', 'Hotelaria', 'Escritório', 'Educação', 'Cooperativas', 'Logística', 'Outro'];
const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

type FormState = {
  funcionarios: string;
  segmento: string;
  estado: string;
  nome: string;
  telefone: string;
  email: string;
  empresa: string;
  necessidade: string;
};

const initialState: FormState = {
  funcionarios: '', segmento: '', estado: '', nome: '', telefone: '', email: '', empresa: '', necessidade: '',
};

const ContactForm = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  const set = (field: keyof FormState, value: string) => {
    if (!started) { setStarted(true); track('form_start'); }
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validateStepOne = () => {
    const next: Record<string, string> = {};
    if (!data.funcionarios) next.funcionarios = 'Escolha o tamanho da equipe.';
    if (!data.segmento) next.segmento = 'Selecione o segmento.';
    if (!data.estado) next.estado = 'Selecione o estado.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStepTwo = () => {
    const next: Record<string, string> = {};
    if (data.nome.trim().length < 2) next.nome = 'Informe seu nome.';
    if (!isValidPhone(data.telefone)) next.telefone = 'Informe 11 dígitos, incluindo o DDD.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Informe um e-mail válido.';
    if (data.empresa.trim().length < 2) next.empresa = 'Informe o nome da empresa.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStepOne()) return;
    setStep(2);
    track('form_step_2', { funcionarios: data.funcionarios, segmento: data.segmento, estado: data.estado });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStepTwo()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', { body: data });
      if (error) throw error;
      track('generate_lead', { source: 'form', funcionarios: data.funcionarios, segmento: data.segmento });
      if (typeof window.gtag_report_conversion_lead === 'function') window.gtag_report_conversion_lead();
      window.location.assign('/obrigado');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Não foi possível enviar agora. Revise os dados e tente novamente.');
      setSubmitting(false);
    }
  };

  const errorFor = (field: string) => errors[field] ? <p className="mt-1.5 text-sm text-destructive" role="alert">{errors[field]}</p> : null;

  return (
    <section id="orcamento" className="py-16 md:py-24 bg-gold-soft">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-sm font-semibold uppercase tracking-wider text-olive-deep">Orçamento personalizado</p>
          <h2 className="mt-2 text-[28px] md:text-[40px] font-bold text-ink">Vamos vestir sua equipe?</h2>
          <p className="mt-3 text-muted-foreground">Conte sobre sua empresa. Nossa equipe prepara uma proposta sem compromisso.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 bg-background rounded-2xl overflow-hidden shadow-lift reveal">
          <div className="hidden lg:block min-h-[620px]">
            <img
              src="/img/contato-611.webp"
              srcSet="/img/contato-480.webp 480w, /img/contato-611.webp 611w"
              sizes="50vw"
              width={611}
              height={409}
              loading="lazy"
              alt="Equipe usando uniformes corporativos personalizados"
              className="w-full h-full object-cover"
            />
          </div>

          <form onSubmit={submit} className="p-6 md:p-10 lg:p-12" noValidate>
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-olive-deep">Etapa {step} de 2</span>
              <span className="text-muted-foreground">{step === 1 ? 'Sua empresa' : 'Seu contato'}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden" aria-label={`Progresso: etapa ${step} de 2`}>
              <div className="h-full bg-olive transition-[width] duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
            </div>

            {step === 1 ? (
              <div className="mt-8 space-y-6">
                <fieldset>
                  <legend className="text-sm font-semibold text-ink">Número de colaboradores</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {employeeRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        aria-pressed={data.funcionarios === range}
                        onClick={() => set('funcionarios', range)}
                        className={cn('min-h-12 rounded-xl border px-3 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', data.funcionarios === range ? 'border-olive bg-olive text-primary-foreground' : 'border-input bg-background text-ink hover:bg-accent')}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  {errorFor('funcionarios')}
                </fieldset>

                <div>
                  <Label htmlFor="segmento">Segmento</Label>
                  <Select value={data.segmento} onValueChange={(value) => set('segmento', value)}>
                    <SelectTrigger id="segmento" className="mt-2 h-12"><SelectValue placeholder="Selecione o segmento" /></SelectTrigger>
                    <SelectContent>{segments.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                  </Select>
                  {errorFor('segmento')}
                </div>

                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={data.estado} onValueChange={(value) => set('estado', value)}>
                    <SelectTrigger id="estado" className="mt-2 h-12"><SelectValue placeholder="Selecione a UF" /></SelectTrigger>
                    <SelectContent>{states.map((uf) => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}</SelectContent>
                  </Select>
                  {errorFor('estado')}
                </div>

                <Button type="button" onClick={goNext} className="w-full h-12 font-semibold">
                  Continuar <ArrowRight className="w-4 h-4 ml-2" aria-hidden />
                </Button>
              </div>
            ) : (
              <div className="mt-8 space-y-5">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input id="nome" name="nome" autoComplete="name" value={data.nome} onChange={(e) => set('nome', e.target.value)} className="mt-2 h-12" />
                  {errorFor('nome')}
                </div>
                <div>
                  <Label htmlFor="telefone">WhatsApp com DDD</Label>
                  <Input id="telefone" name="telefone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="(54) 99999-9999" maxLength={15} value={data.telefone} onChange={(e) => set('telefone', formatPhone(e.target.value))} className="mt-2 h-12" />
                  {errorFor('telefone')}
                </div>
                <div>
                  <Label htmlFor="email">E-mail corporativo</Label>
                  <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} className="mt-2 h-12" />
                  {errorFor('email')}
                </div>
                <div>
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" name="empresa" autoComplete="organization" value={data.empresa} onChange={(e) => set('empresa', e.target.value)} className="mt-2 h-12" />
                  {errorFor('empresa')}
                </div>
                <div>
                  <Label htmlFor="necessidade">O que você precisa? <span className="font-normal text-muted-foreground">(opcional)</span></Label>
                  <Textarea id="necessidade" name="necessidade" maxLength={500} value={data.necessidade} onChange={(e) => set('necessidade', e.target.value)} className="mt-2 min-h-24 resize-y" />
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 px-4">
                    <ArrowLeft className="w-4 h-4 mr-2" aria-hidden /> Voltar
                  </Button>
                  <Button type="submit" disabled={submitting} className="h-12 flex-1 font-semibold">
                    {submitting ? 'Enviando...' : <><Send className="w-4 h-4 mr-2" aria-hidden /> Solicitar orçamento</>}
                  </Button>
                </div>
                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-4 h-4 text-success shrink-0" aria-hidden />
                  Seus dados serão usados apenas para responder à solicitação.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;