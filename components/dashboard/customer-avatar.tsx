interface Props {
  firstName?: string | null;
  lastName?: string | null;
}

export default function CustomerAvatar({
  firstName,
  lastName,
}: Props) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;

  return (
    <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
      {initials || "?"}
    </div>
  );
}