import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "✓", description: t.contact.form.success });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.contact.title}</h1>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-accent" />
                    </div>
                    <p className="text-lg text-foreground">{t.contact.form.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.name}</label>
                        <Input required placeholder={t.contact.form.name} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.company}</label>
                        <Input required placeholder={t.contact.form.company} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.email}</label>
                        <Input type="email" required placeholder={t.contact.form.email} />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.phone}</label>
                        <Input type="tel" placeholder={t.contact.form.phone} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.type}</label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder={t.contact.form.type} /></SelectTrigger>
                        <SelectContent>
                          {t.contact.form.types.map((type, i) => (
                            <SelectItem key={i} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{t.contact.form.message}</label>
                      <Textarea required rows={5} placeholder={t.contact.form.message} />
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-primary gap-2">
                      <Send className="h-4 w-4" /> {t.contact.form.submit}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">{t.contact.info.title}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{t.contact.info.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.contact.info.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.contact.info.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{t.contact.info.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
