interface ExerciseCardProps {
  name: string;
  sets: number;
  reps: number;
  perLeg?: boolean;
  tip: string;
  gifUrl: string;
}

export function ExerciseCard({ name, sets, reps, perLeg, tip, gifUrl }: ExerciseCardProps) {
  const badge = perLeg ? `${sets}x${reps} cada perna` : `${sets}x${reps}`;

  return (
    <article className="bg-white rounded-3xl shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="min-h-[320px] sm:min-h-[360px] w-full overflow-hidden bg-blue-100">
        <img src={gifUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-800 text-white text-xl">🏋️</span>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          </div>
          <span className="inline-flex items-center justify-center rounded-full bg-blue-800 px-3 py-1 text-sm font-medium text-white whitespace-nowrap">
            {badge}
          </span>
        </div>
        <div className="bg-blue-100 border-l-4 border-blue-800 p-4 rounded-xl">
          <p className="text-sm leading-6 text-gray-700">
            <span className="font-semibold text-blue-800">💡 Dica:</span> {tip}
          </p>
        </div>
      </div>
    </article>
  );
}
