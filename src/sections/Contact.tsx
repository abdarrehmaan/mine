import { useEffect, useRef, useState, Suspense } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram, PhoneCall, MessageCircle, CheckCircle, Copy, Check } from 'lucide-react';
import ContactDecoration from '../components/3d/ContactDecoration';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [show3D, setShow3D] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShow3D(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abdul.arm67@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/abdarrehmaan', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abdur-rahman-maqsood-110438259', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/abdarrehmaan', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/abdarrehmaan', label: 'Instagram' },
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-32 bg-void overflow-hidden">

      {/* 3D Decoration */}
      {show3D && (
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50">
          <Suspense fallback={null}>
            <ContactDecoration />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Let's Connect
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In <span className="gradient-text">Touch</span></h2>
          <p className="text-silver leading-relaxed">
            Have a project idea, e-commerce platform build, or full-stack opportunity in mind? Send a message and let's bring it to life!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* FORM */}
          <div>
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl text-white font-bold mb-2">Message Received!</h3>
                  <p className="text-silver text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-silver/80 uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Abdur Rahman"
                      className="w-full input-glow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver/80 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full input-glow"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-silver/80 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project goals..."
                      className="w-full input-glow"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/30 py-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Email */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between group hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-0.5">Email Direct</h4>
                    <a
                      href="mailto:abdul.arm67@gmail.com"
                      className="text-silver hover:text-primary transition-colors text-sm"
                    >
                      abdul.arm67@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-silver hover:text-white hover:bg-white/10 transition-all duration-300 text-xs font-medium flex items-center gap-1.5"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4 group hover:border-primary/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <MapPin className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-0.5">Location</h4>
                  <span className="text-silver text-sm">Prayagraj, Uttar Pradesh, India</span>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4 group hover:border-primary/40 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <PhoneCall className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">Phone</h4>
                    <a href="tel:+919473630937" className="text-silver hover:text-primary transition-colors text-xs font-mono">
                      +91 9473630937
                    </a>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center gap-4 group hover:border-primary/40 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-300">
                    <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-0.5">WhatsApp</h4>
                    <a href="https://wa.me/919473630937" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-emerald-400 transition-colors text-xs font-mono">
                      +91 9473630937
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Cards */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-mono text-silver/80 uppercase tracking-wider mb-4">Connect on Social</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-all duration-300 shadow-md"
                    aria-label={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
