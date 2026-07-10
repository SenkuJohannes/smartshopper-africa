import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">

      {/* Hero */}

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          SmartShopper Africa
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
          Loyalty made simple for
          <span className="text-green-600"> Coffee Shops</span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl text-slate-600">
          Reward every customer visit with QR codes, Apple Wallet,
          Google Wallet and an intelligent loyalty platform built
          for independent cafés.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/onboarding/welcome"
            className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Create a business account
          </Link>

          <Link
  href="/login"
  className="rounded-xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition hover:bg-slate-100"
>
  Login your business account
</Link>

        </div>

      </section>

      {/* Features */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Everything you need to grow customer loyalty
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <Feature
            icon="📱"
            title="Digital Loyalty Cards"
            description="Customers carry their loyalty card on their phone."
          />

          <Feature
            icon="📷"
            title="QR Code Scanner"
            description="Staff scan customers in seconds."
          />

          <Feature
            icon="⭐"
            title="Automatic Points"
            description="Points are awarded instantly after every purchase."
          />

          <Feature
            icon="🎁"
            title="Rewards"
            description="Create coupons, discounts and free drinks."
          />

          <Feature
            icon="🍎"
            title="Apple Wallet"
            description="Customers keep their loyalty card in Apple Wallet."
          />

          <Feature
            icon="📊"
            title="Analytics"
            description="Track visits, rewards and customer growth."
          />

        </div>

      </section>

      {/* CTA */}

      <section className="bg-green-600 py-20 text-center text-white">

        <h2 className="text-4xl font-bold">
          Ready to grow your coffee shop?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-green-100">
          Join SmartShopper Africa and turn first-time visitors into
          loyal customers.
        </p>

        <Link
          href="/register-business"
          className="mt-10 inline-block rounded-xl bg-white px-8 py-4 text-lg font-bold text-green-700 transition hover:bg-slate-100"
        >
          Create Your Free Account
        </Link>

      </section>

    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-5xl">{icon}</div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-slate-600">
        {description}
      </p>

    </div>
  );
}