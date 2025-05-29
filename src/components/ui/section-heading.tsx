interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  alignment = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <h2 className="text-2xl md:text-3xl font-semibold uppercase mb-2">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}

      {alignment === "center" && (
        <div className="flex items-center justify-center mt-4">
          <div className="w-16 h-[3px] bg-primary"></div>
        </div>
      )}
    </div>
  );
}
