import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground font-sans">
      <div className="max-w-md w-full px-6 py-12 bg-card rounded-3xl border border-border shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold font-display text-foreground mb-3">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          No encontramos lo que buscas.
        </p>
        
        <Link href="/" className="inline-block w-full">
          <Button size="lg" className="w-full rounded-full font-bold">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}
