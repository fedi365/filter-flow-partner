import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FP</span>
              </div>
              <span className="text-xl font-bold">FiltrationPro</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">{t.nav.about}</h3>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <Link to="/products" className="hover:text-background transition-colors">{t.nav.products}</Link>
              <Link to="/deals" className="hover:text-background transition-colors">{t.nav.deals}</Link>
              <Link to="/guide" className="hover:text-background transition-colors">{t.nav.guide}</Link>
              <Link to="/contact" className="hover:text-background transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t.nav.contact}</h3>
            <div className="flex flex-col gap-3 text-sm text-background/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{t.footer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{t.footer.email}</span>
              </div>
              <a href="#" className="flex items-center gap-2 hover:text-background transition-colors">
                <Linkedin className="h-4 w-4 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} FiltrationPro. {t.footer.rights}</p>
          <a href="#" className="hover:text-background/70 transition-colors">{t.footer.legal}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
