import Navbar from "../(site)/components/Navbar";
import Hero from "../(site)/components/Hero";
import Section from "../(site)/components/Section";
import Card from "../(site)/components/Card";
import Footer from "../(site)/components/Footer";
import ContactForm from "../(site)/components/ContactForm";
import Button from "../(site)/components/Button";

export const metadata = {
  title: "Toscano Tabaco - Experiencias sensoriales",
  description: "Tabacos selectos, maridajes y eventos privados en CABA.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero
        title="Il Sigaro Italiano"
        subtitle="Experiencias sensoriales, maridajes y selección de tabacos."
        imageSrc="/toscano.avif"
        cta={<a href="#contacto"><Button>Consultá por experiencias</Button></a>}
        
      />
      <Section title="Experiencias" >
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Catas privadas" description="Sesiones guiadas y selección de tabacos premium." />
          <Card title="Maridajes" description="Café Romagnoli, destilados y tabacos en armonía." />
          <Card title="Accesorios" description="Cortadores, encendedores y humidores." />
        </div>
      </Section>
      <Section title="Contacto">
        <div id="contacto" className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-2">Consultas generales</h3>
            <ContactForm tag="B2C" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Empresas y eventos</h3>
            <ContactForm tag="B2B" />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
