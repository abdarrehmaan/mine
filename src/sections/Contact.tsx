import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram, PhoneCall, MessageCircle, CheckCircle } from 'lucide-react';

// Lazy load 3D component
const ContactDecoration = lazy(() => import('../components/3d/ContactDecoration'));

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [show3D, setShow3D] = useState(false);

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

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-primary font-medium mb-2 uppercase text-sm">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-silver max-w-2xl mx-auto">
            Have a project in mind? Let’s build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* FORM */}
          <div>
            <div className="glass rounded-2xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl text-white font-bold">Message Sent!</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full input-glow"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="w-full input-glow"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Message"
                    className="w-full input-glow"
                  />

                  <button type="submit" className="w-full btn-primary flex justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                </form>
              )}
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Email</h4>
                <a
                  href="mailto:abdul.arm67@gmail.com?subject=Hello%20Abdur&body=Hi%20Abdur%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  className="text-silver hover:text-primary transition-colors"
                >
                  abdul.arm67@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Location</h4>
                <span className="text-silver">Prayagraj, India</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <PhoneCall className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Phone</h4>
                <a
                  href="tel:+919473630937"
                  className="text-silver hover:text-primary transition-colors"
                >
                  +91 9473630937
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">WhatsApp</h4>
                <a
                  href="https://wa.me/919473630937?text=Hello%20Abdur%2C%20I%20am%20interested%20in%20your%20services.%20Can%20we%20talk%20about%20a%20project%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver hover:text-primary transition-colors"
                >
                  +91 9473630937
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
