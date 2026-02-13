import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Deals = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.deals.title}</h1>
          <p className="text-lg text-muted-foreground">{t.deals.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {t.deals.packs.map((pack, i) => {
            const isFeatured = "featured" in pack && pack.featured;
            return (
              <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className={`h-full relative ${isFeatured ? "border-accent shadow-lg ring-2 ring-accent/20" : "hover:shadow-md"} transition-shadow`}>
                  {isFeatured && (
                    <div className="absolute -top-3 left-6">
                      <Badge className="bg-accent text-accent-foreground gap-1">
                        <Star className="h-3 w-3" /> {t.deals.featured}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{pack.name}</h3>
                    <p className="text-muted-foreground mb-6">{pack.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {pack.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
            <Link to="/contact">{t.deals.ctaDevis}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deals;
