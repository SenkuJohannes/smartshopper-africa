import RuleCard from "./RuleCard";

interface Rule {
  id: string;
  icon: string;
  title: string;
  when: string;
  then: string;
  status?:
    | "success"
    | "reward"
    | "offer"
    | "campaign"
    | "network"
    | "inactive";
}

interface RuleBoardProps {
  title: string;
  description?: string;
  rules: Rule[];
  buttonLabel: string;
  onCreate?: () => void;
}

export default function RuleBoard({
  title,
  description,
  rules,
  buttonLabel,
  onCreate,
}: RuleBoardProps) {
  return (
    <section className="mb-12">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-gray-500">
              {description}
            </p>
          )}

        </div>

        <button
          onClick={onCreate}
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          + {buttonLabel}
        </button>

      </div>

      {rules.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">

          <h3 className="text-xl font-bold">
            No Rules Yet
          </h3>

          <p className="mt-3 text-gray-500">
            Create your first rule to get started.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {rules.map((rule) => (
            <RuleCard
              key={rule.id}
              icon={rule.icon}
              title={rule.title}
              when={rule.when}
              then={rule.then}
              status={rule.status}
            />
          ))}

        </div>
      )}

    </section>
  );
}