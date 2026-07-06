"use client";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-zinc-300
          bg-white
          px-4
          py-3
          outline-none
          transition

          focus:border-green-600
          focus:ring-2
          focus:ring-green-100
        "
      />
    </div>
  );
}