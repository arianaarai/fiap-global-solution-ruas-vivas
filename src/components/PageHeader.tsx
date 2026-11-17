type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children: string;
};

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <div className="page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
