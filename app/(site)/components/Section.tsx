type Props = { title: string; children: React.ReactNode; dark?: boolean };

export default function Section({ title, children }: Props) {
  const sectionClasses = "background" ;
  const headingClasses = true
    ? "text-2xl md:text-3xl font-semibold text-white"
    : "text-2xl md:text-3xl font-semibold text-gray-900";

  return (
    <section className={sectionClasses}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className={headingClasses}>{title}</h2>
        <div className="mt-6 grid gap-6">{children}</div>
      </div>
    </section>
  );
}
