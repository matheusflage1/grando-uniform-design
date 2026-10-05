import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/track';
import { formatPhone, isValidPhone } from '@/lib/phone';

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
  source?: string;
}

const WhatsAppPopup = ({ isOpen, onClose, whatsappLink, source = '' }: WhatsAppPopupProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const valid = isValidPhone(phoneNumber);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      toast.error('Informe um WhatsApp válido com DDD (11 dígitos).');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('whatsapp_leads').insert({
        phone_number: phoneNumber.replace(/\D/g, ''),
        ip_address: null,
        source_page: `${window.location.pathname}${source ? `#${source}` : ''}`,
      });
      if (error) throw error;

      track('whatsapp_lead_captured', { source });
      track('whatsapp_redirect', { source });

      // Existing Google Ads "Contato" conversion, which then redirects
      if (typeof window.gtag_report_conversion_contact === 'function') {
        window.gtag_report_conversion_contact(whatsappLink);
      } else {
        window.location.href = whatsappLink;
      }
      onClose();
      setPhoneNumber('');
    } catch (err) {
      console.error('Error saving WhatsApp lead:', err);
      toast.error('Não foi possível continuar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-ink flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-success" aria-hidden />
            Conversar no WhatsApp
          </DialogTitle>
          <DialogDescription>
            Informe seu WhatsApp com DDD para falar com um consultor.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="wa-phone">Seu WhatsApp</Label>
            <Input
              id="wa-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(54) 99999-9999"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhone(e.target.value))}
              className="h-12 text-center text-lg"
              maxLength={15}
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12" disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!valid || isSubmitting} className="flex-1 h-12 bg-success hover:bg-success/90 text-primary-foreground">
              <MessageCircle className="w-4 h-4 mr-2" aria-hidden />
              {isSubmitting ? 'Abrindo...' : 'Conversar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPopup;
