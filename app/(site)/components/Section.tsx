type Props = { title: string; children: React.ReactNode; dark?: boolean };

export default function Section({ title, children, dark }: Props) {
  return (
    <section className={(dark ? "bg-white" : "bg-white") + ""}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
        <div className="mt-6 grid gap-6">{children}</div>
      </div>
    </section>
  );
}
