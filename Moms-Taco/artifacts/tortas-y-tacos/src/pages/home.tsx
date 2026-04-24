import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, MessageCircle, Menu as MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderForm from '@/components/OrderForm';

// Image imports
import heroBg from '@/assets/tacos-pastor.png';
import comalImg from '@/assets/tortillas-comal.png';
import salsasImg from '@/assets/salsas.png';
import cebollitasImg from '@/assets/cebollitas.png';

const MOCK_PHONE = "+52 55 1234 5678";
const MOCK_ADDRESS = "Calle Principal #123, Colonia Centro";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Menú', id: 'menu' },
    { name: 'Pedido', id: 'pedido' },
    { name: 'Horarios', id: 'horarios' },
    { name: 'Contacto', id: 'contacto' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Navigation */}
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            className="cursor-pointer"
            onClick={() => scrollTo('inicio')}
            data-testid="logo-link"
          >
            <h1 className={`font-display font-bold tracking-tight text-xl md:text-2xl transition-colors ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              Tortas y tacos de la mamá
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isScrolled ? 'text-foreground' : 'text-white/90 hover:text-white'
                }`}
                data-testid={`nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollTo('pedido')}
              className={`rounded-full px-6 font-bold ${
                isScrolled ? '' : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Pedir Ahora
            </Button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <MenuIcon className={isScrolled ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background shadow-lg border-t md:hidden flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-lg font-medium text-foreground py-2 border-b border-border/50"
              >
                {link.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollTo('pedido')}
              className="w-full mt-4 rounded-full font-bold"
              size="lg"
            >
              Pedir Ahora
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Tacos al pastor" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-white border border-primary/30 text-sm font-medium tracking-wider uppercase mb-2">
              Auténtico Sabor Mexicano
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] tracking-tight">
              Sabor casero <br/><span className="text-accent">que conquista</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Tacos estilo casero y tortillas hechas a mano, preparados con las recetas de la abuela. El verdadero sabor de nuestro barrio.
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="rounded-full text-lg h-14 px-8 w-full sm:w-auto font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                onClick={() => scrollTo('menu')}
              >
                Ver Menú
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full text-lg h-14 px-8 w-full sm:w-auto font-bold bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => scrollTo('contacto')}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Cómo Llegar
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story / About Strip */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold">Tradición en cada bocado</h2>
              <p className="text-primary-foreground/90 text-lg leading-relaxed">
                Nuestra historia comienza con las recetas de la mamá. Cada salsa, cada adobo y cada tortilla lleva consigo el amor y la sazón de generaciones. No somos una franquicia, somos tu familia cocinando para ti.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[16/9]"
            >
              <img src={comalImg} alt="Tortillas hechas a mano en comal" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menú Section */}
      <section id="menu" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Nuestro Menú</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sencillo, delicioso y preparado al momento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Tacos Column */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                  <h3 className="font-display text-2xl font-bold text-primary">Tacos</h3>
                  <span className="bg-secondary/10 text-secondary text-sm font-semibold px-3 py-1 rounded-full">
                    Cada uno
                  </span>
                </div>
                
                <ul className="space-y-4">
                  {[
                    { name: 'Asada de res', price: '$25.00' },
                    { name: 'Chorizo', price: '$25.00' },
                    { name: 'Pastor', price: '$25.00' },
                    { name: 'Birria', price: '$25.00' },
                    { name: 'Lengua de res', price: '$34.00' },
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center group p-3 rounded-xl hover:bg-card hover:shadow-sm transition-all"
                    >
                      <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <div className="flex-1 border-b-2 border-dotted border-border mx-4 relative top-1 group-hover:border-primary/30 transition-colors"></div>
                      <span className="font-bold text-xl text-accent">{item.price}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border p-6 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-display text-xl font-bold text-foreground">Tacos con queso</h4>
                  <span className="font-bold text-2xl text-accent">$29.00</span>
                </div>
                <p className="text-muted-foreground">Cualquiera de nuestras carnes con costra de queso fundido.</p>
              </div>
            </div>

            {/* Extras & Images Column */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
                  <h3 className="font-display text-2xl font-bold text-secondary">Extras</h3>
                </div>
                
                <ul className="space-y-4">
                  <motion.li 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center group p-3 rounded-xl hover:bg-card hover:shadow-sm transition-all"
                  >
                    <span className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors">
                      Orden de cebollitas de cambray
                    </span>
                    <div className="flex-1 border-b-2 border-dotted border-border mx-4 relative top-1 group-hover:border-secondary/30 transition-colors"></div>
                    <span className="font-bold text-xl text-accent">$25.00</span>
                  </motion.li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="rounded-xl overflow-hidden aspect-square shadow-md hover:scale-[1.02] transition-transform duration-300">
                  <img src={salsasImg} alt="Salsas mexicanas" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square shadow-md hover:scale-[1.02] transition-transform duration-300">
                  <img src={cebollitasImg} alt="Cebollitas asadas" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-muted/50 border border-muted-border p-8 rounded-3xl max-w-4xl mx-auto text-center"
          >
            <p className="font-medium text-lg md:text-xl text-foreground leading-relaxed italic">
              "Todos nuestros tacos están preparados con tortilla recién hecha a mano, cebolla, cilantro, limones y salsa verde y roja al gusto."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Order Form Section */}
      <OrderForm whatsappPhone={MOCK_PHONE} />

      {/* Info Section (Horarios y Contacto) */}
      <section className="bg-card border-t border-b border-border">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          
          {/* Horarios */}
          <div id="horarios" className="py-20 px-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="font-display text-3xl font-bold">Horarios</h2>
            <div className="space-y-3">
              <div className="text-xl font-medium text-foreground">
                Lunes a sábado: <br/>
                <span className="text-primary font-bold text-2xl">6:00 pm a 12:00 am</span>
              </div>
              <div className="text-lg text-muted-foreground font-medium bg-muted px-4 py-2 rounded-full inline-block mt-2">
                Domingo: cerrado
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div id="contacto" className="py-20 px-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-display text-3xl font-bold">Visítanos</h2>
            <div className="space-y-4 max-w-sm">
              <p className="text-lg text-muted-foreground">
                {MOCK_ADDRESS}
              </p>
              <div className="pt-4 space-y-4">
                <a 
                  href={`https://wa.me/${MOCK_PHONE.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  data-testid="whatsapp-button"
                >
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full h-14 text-lg font-bold shadow-lg shadow-[#25D366]/20">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Pedir por WhatsApp
                  </Button>
                </a>
                <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
                  <Phone className="w-4 h-4" />
                  <span>{MOCK_PHONE}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 text-center">
        <div className="container mx-auto px-4 space-y-8">
          <div>
            <h3 className="font-display text-2xl font-bold mb-3 text-primary">Tortas y tacos de la mamá</h3>
            <p className="text-background/70 max-w-md mx-auto">
              Sabor casero que conquista. Gracias por ser parte de nuestra familia.
            </p>
          </div>
          <div className="pt-8 border-t border-background/10 space-y-1 text-background/80">
            <p className="text-xs tracking-[0.3em] font-bold text-primary/90">CUCEI</p>
            <p className="font-display text-base font-bold tracking-wide">
              LAURA IXCHEL CARBAJAL JIMENEZ
            </p>
            <p className="text-xs tracking-[0.25em] font-semibold text-background/60">
              DESARROLLO DE APPS WEB
            </p>
          </div>
          <div className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} Tortas y tacos de la mamá. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
