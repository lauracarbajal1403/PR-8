import type { FormEvent } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface OrderFormProps {
  whatsappPhone: string;
}

export default function OrderForm({ whatsappPhone }: OrderFormProps) {
  const [order, setOrder] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submitToWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (!order.trim()) {
      setError('Por favor escribe lo que quieres pedir.');
      return;
    }
    setError(null);
    const message = encodeURIComponent(order.trim());
    const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pedido" className="py-24 bg-muted/40 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 space-y-4 max-w-2xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/15 text-accent border border-accent/30 text-xs font-bold tracking-wider uppercase">
            Pide en línea
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Haz tu pedido
          </h2>
          <p className="text-muted-foreground text-lg">
            Escribe lo que se te antoja y enviamos tu pedido a la cocina.
          </p>
        </motion.div>

        <form
          onSubmit={submitToWhatsApp}
          className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4"
          data-testid="order-form"
        >
          <Textarea
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Ej. 3 tacos de pastor, 2 de asada y una orden de cebollitas."
            rows={5}
            className="text-base"
            data-testid="input-order"
          />

          {error && (
            <div
              role="alert"
              className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2"
              data-testid="form-error"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-14 text-base font-bold"
            data-testid="submit-order"
          >
            <Send className="mr-2 h-5 w-5" />
            Enviar
          </Button>
        </form>
      </div>
    </section>
  );
}
