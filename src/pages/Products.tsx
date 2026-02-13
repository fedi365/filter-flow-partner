import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Products = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const products = t.products.items;

  if (selectedProduct !== null) {
    const product = products[selectedProduct];
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => setSelectedProduct(null)} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" /> {t.products.backToList}
          </Button>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            <div className="grid gap-8">
              {/* Applications */}
              <Card>
                <CardHeader><CardTitle>{t.products.applications}</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, i) => (
                      <Badge key={i} variant="secondary" className="text-sm py-1 px-3">{app}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader><CardTitle>{t.products.performance}</CardTitle></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Paramètre</TableHead>
                        <TableHead>Valeur</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.performances.map((perf, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{perf.param}</TableCell>
                          <TableCell>{perf.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader><CardTitle>{t.products.tips}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{product.tips}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2 bg-primary">
                  <Download className="h-4 w-4" /> {t.products.download}
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/contact"><Phone className="h-4 w-4" /> {t.products.contact}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.products.title}</h1>
          <p className="text-lg text-muted-foreground">{t.products.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setSelectedProduct(i)}>
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <span className="text-primary font-bold text-lg">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{product.name}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{product.shortDesc}</p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    {t.products.details} <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
