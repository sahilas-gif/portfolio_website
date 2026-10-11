type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <header className="section-heading js-reveal">
      <div>
        <p className="eyebrow">
          <span className="chapter-number">{index}</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-intro">{description}</p>}
    </header>
  );
}
