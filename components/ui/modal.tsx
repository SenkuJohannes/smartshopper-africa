"use client";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  actions?: React.ReactNode;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
  actions,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

        </div>

        <div className="px-6 py-6">

          {children}

        </div>

        {actions && (

          <div className="flex justify-end gap-3 border-t px-6 py-5">

            {actions}

          </div>

        )}

      </div>

    </div>
  );
}