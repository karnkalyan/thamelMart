
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin } from '../components/Icons';
import { useDataStore } from '../store/dataStore';

const ContactPage: React.FC = () => {
  const { addMessage, settings } = useDataStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div>
      <section className="bg-brand-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold text-brand-primary">Contact Us</h1>
          <p className="text-brand-text mt-2 max-w-2xl mx-auto">We'd love to hear from you. Reach out with any questions or feedback.</p>
        </div>
      </section>

      <section className="py-20 bg-brand-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-8 flex flex-col justify-center">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-text mb-4">Get in Touch</h2>
                    <p className="text-brand-muted">
                        Our team is here to help. Contact us by phone, email, or through our form.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-4 text-brand-accent" />
                        <span className="text-brand-muted">{settings.contactAddress}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-4 text-brand-accent" />
                        <span className="text-brand-muted">{settings.contactPhone}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-4 text-brand-accent" />
                        <span className="text-brand-muted">{settings.contactEmail}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
                {sent ? (
                    <div className="py-12 text-center animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 font-bold">✓</div>
                        <h3 className="text-xl font-serif font-bold text-brand-primary mb-2">Message Received</h3>
                        <p className="text-sm text-brand-muted">Namaste! We have received your inquiry and will respond shortly.</p>
                        <button onClick={() => setSent(false)} className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-accent underline">Send another message</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1">Name</label>
                            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" id="name" className="w-full bg-brand-footer px-3 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary text-sm" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1">Email</label>
                            <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" id="email" className="w-full bg-brand-footer px-3 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary text-sm" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-1">Message</label>
                            <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} id="message" rows={5} className="w-full bg-brand-footer px-3 py-2 border border-stone-300 rounded-md focus:ring-brand-primary focus:border-brand-primary text-sm"></textarea>
                        </div>
                        <div>
                            <Button type="submit" size="lg" className="w-full">Send Message</Button>
                        </div>
                    </form>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
