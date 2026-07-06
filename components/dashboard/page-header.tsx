interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>

        <p className="mt-1 text-zinc-500">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}