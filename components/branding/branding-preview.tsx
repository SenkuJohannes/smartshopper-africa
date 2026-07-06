type Program = {
  name: string;
  welcome_message: string | null;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  banner_url: string | null;
};

export default function BrandingPreview({
  program,
}: {
  program: Program;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-2xl font-bold mb-6">
        Live Preview
      </h2>

      <div
        className="rounded-3xl overflow-hidden shadow-xl"
        style={{
          background: program.secondary_color || "#ffffff",
        }}
      >
        {/* Banner */}

        {program.banner_url ? (
          <img
            src={program.banner_url}
            alt="Banner"
            className="w-full h-40 object-cover"
          />
        ) : (
          <div
            className="h-40"
            style={{
              background: program.primary_color,
            }}
          />
        )}

        <div className="p-8 text-center">
          {/* Logo */}

          <div className="-mt-20 mb-4 flex justify-center">
            {program.logo_url ? (
              <img
                src={program.logo_url}
                alt="Logo"
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
            ) : (
              <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg bg-white flex items-center justify-center text-4xl">
                ☕
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold">
            {program.name}
          </h2>

          <p className="text-gray-500 mt-2">
            {program.welcome_message ||
              "Welcome to our loyalty program"}
          </p>

          <div className="mt-8">
            <p className="text-gray-500">
              Available Points
            </p>

            <h1
              className="text-5xl font-bold mt-2"
              style={{
                color: program.primary_color,
              }}
            >
              245
            </h1>
          </div>

          <div className="mt-10 h-28 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            QR Code
          </div>
        </div>
      </div>
    </div>
  );
}