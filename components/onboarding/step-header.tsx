interface Props {
  title: string;
  description: string;
}

export default function StepHeader({
  title,
  description,
}: Props) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-bold text-zinc-900">
        {title}
      </h1>

      <p className="mt-3 text-lg text-zinc-500">
        {description}
      </p>
    </div>
  );
}