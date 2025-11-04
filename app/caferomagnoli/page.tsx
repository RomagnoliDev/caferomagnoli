import Navbar from "../(site)/components/Navbar";
import Hero from "../(site)/components/Hero";
import Section from "../(site)/components/Section";
import Card from "../(site)/components/Card";
import Footer from "../(site)/components/Footer";
import ContactForm from "../(site)/components/ContactForm";
import Button from "../(site)/components/Button";

export const metadata = {
  title: "Café Romagnoli - Cápsulas, grano y molido",
  description: "Café italiano premium. Máquinas en comodato o venta. B2C y B2B.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero
        title="El arte de disfrutar el tiempo."
        subtitle="Café italiano de excelencia: cápsulas compatibles, cialdas, molido y en grano."
        imageSrc="/romagnoli.png"
        cta={<a href="#contacto"><Button>Solicitá tu plan</Button></a>}
      />
      <Section title="Productos">
        <div className="grid md:grid-cols-4 gap-6">
          <Card title="Cápsulas" description="Compatibles tipo Nespresso. Variedades intensas y balanceadas." />
          <Card title="Molido" description="Molienda precisa para espresso o filtro." />
          <Card title="Grano" description="Blend italiano con tueste equilibrado." />
          <Card title="Cialdas" description="Cialdas compatibles con máquinas de café, mono dosis y bi dosis." />
        </div>
      </Section>
      <Section title="Máquinas en comodato">
        <Card
          title="Solución para oficinas y locales"
          description="Instalación, capacitación y reposición. Planes por consumo."
        >
          <a href="#contacto"><Button>Quiero más información</Button></a>
        </Card>
      </Section>
      <Section title="Clientes empresas">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Beneficios" description="Embellecé tu experiencia de atención y productividad con espresso perfecto." />
          <Card title="Sectores" description="Oficinas, hoteles boutique, barberías premium, restaurantes y coworks." />
        </div>
      </Section>
      <Section title="Contacto">
        <div id="contacto" className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">Consultas B2C</h3>
            <ContactForm tag="B2C" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Consultas B2B (Empresas)</h3>
            <ContactForm tag="B2B" />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
