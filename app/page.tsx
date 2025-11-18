import Navbar from "./(site)/components/Navbar";
import Hero from "./(site)/components/Hero";
import Section from "./(site)/components/Section";
import Card from "./(site)/components/Card";
import Footer from "./(site)/components/Footer";
import Button from "./(site)/components/Button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero
        title="Romagnoli Group"
        subtitle="Café Romagnoli & Toscano Tabaco - Calidad y experiencia con raíz italiana."
        imageSrc="/romagnoli.png"
        cta={(
          <div className="flex gap-3">
            <Link href="/caferomagnoli"><Button>Ir a Café Romagnoli</Button></Link>
            <Link href="/toscanotabaco"><Button variant="secondary">Ir a Toscano Tabaco</Button></Link>
          </div>
        )}
      />
      <Section title="Unidades de negocio">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Café Romagnoli" description="Cápsulas, grano y molido. Máquinas en comodato o venta.">
            <Link href="/caferomagnoli"><Button>Ver landing</Button></Link>
          </Card>
          <Card title="Toscano Tabaco" description="Experiencias sensoriales, maridajes y productos selectos.">
            <Link href="/toscanotabaco"><Button>Ver landing</Button></Link>
          </Card>
        </div>
      </Section>
      <Footer />
    </>
  );
}
