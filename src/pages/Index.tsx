import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import {
  Beaker,
  Droplets,
  Shield,
  BookOpen,
  ArrowRight,
  ClipboardCheck,
  Award,
  TrendingDown,
  HeadphonesIcon,
  Truck,
  UtensilsCrossed,
  Waves,
  Pill,
  FlaskConical,
  Shirt,
  Hotel,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const Index = () => {
  const { t } = useLanguage();

  const advantageIcons = [
    ClipboardCheck,
    Award,
    TrendingDown,
    HeadphonesIcon,
    Truck,
  ];
  const clientIcons = [
    UtensilsCrossed,
    Waves,
    Pill,
    FlaskConical,
    Shirt,
    Hotel,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(78_53%_49%/0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(24_74%_40%/0.2),transparent_60%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl mb-8 text-primary-foreground/80 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary font-semibold hover:bg-white/90 hover:scale-105 hover:shadow-lg transition-all duration-300 text-base px-8 rounded-full"
              >
                <Link to="/contact">{t.hero.cta1}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 text-white border-2 border-white/40 backdrop-blur-sm font-semibold hover:bg-white/20 hover:border-white/70 hover:scale-105 transition-all duration-300 text-base px-8 rounded-full"
              >
                <Link to="/contact">{t.hero.cta2}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              {t.about.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground"
            >
              {t.about.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Beaker,
                title: t.about.expertise,
                desc: t.about.expertiseDesc,
              },
              {
                icon: Droplets,
                title: t.about.process,
                desc: t.about.processDesc,
              },
              { icon: Shield, title: t.about.accomp, desc: t.about.accompDesc },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-5">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              {t.advantages.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground"
            >
              {t.advantages.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {t.advantages.items.map((item, i) => {
              const Icon = advantageIcons[i];
              return (
                <motion.div key={i} variants={fadeUp}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              {t.clients.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground"
            >
              {t.clients.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {t.clients.items.map((name, i) => {
              const Icon = clientIcons[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all"
                >
                  <Icon className="h-10 w-10 text-primary" />
                  <span className="text-sm font-medium text-foreground text-center">
                    {name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Normes */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
            >
              {t.normes.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-muted-foreground"
            >
              {t.normes.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {t.normes.items.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full border-0 shadow-sm">
                  <CardContent className="p-6">
                    <CheckCircle className="h-8 w-8 text-accent mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guide Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <div className="text-center mb-12">
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              >
                {t.guidePreview.title}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-lg text-muted-foreground"
              >
                {t.guidePreview.subtitle}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <ul className="space-y-3 mb-8">
                    {t.guidePreview.topics.map((topic, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Link to="/guide">{t.guidePreview.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              {t.ctaFinal.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-xl text-primary-foreground/80 mb-8"
            >
              {t.ctaFinal.subtitle}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
              >
                <Link to="/contact">{t.ctaFinal.cta}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
