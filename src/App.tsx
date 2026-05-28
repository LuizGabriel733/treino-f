import { useEffect, useMemo, useState } from 'react';
import { ExerciseCard } from './components/ExerciseCard';
import { RestDay } from './components/RestDay';

const dias = [
  { key: 'segunda', label: 'SEG' },
  { key: 'terca', label: 'TER' },
  { key: 'quarta', label: 'QUA' },
  { key: 'quinta', label: 'QUI' },
  { key: 'sexta', label: 'SEX' },
  { key: 'sabado', label: 'SÁB' },
  { key: 'domingo', label: 'DOM' }
] as const;

const appIconHref = new URL('../gifs/pesoicone.png', import.meta.url).href;

const gifs = {
  agachamentoLivre: new URL('../gifs/inferior/agachamento-livre.gif', import.meta.url).href,
  afundo: new URL('../gifs/inferior/afundo.gif', import.meta.url).href,
  agachamentoSumo: new URL('../gifs/inferior/agachamento-sumo.gif', import.meta.url).href,
  extensora: new URL('../gifs/inferior/cadeira-extensora.gif', import.meta.url).href,
  stiff: new URL('../gifs/inferior/stiff.gif', import.meta.url).href,
  supino: new URL('../gifs/superior/supino-na-maquina.gif', import.meta.url).href,
  puxadaAlta: new URL('../gifs/superior/puxada-alta.gif', import.meta.url).href,
  remadaCurvada: new URL('../gifs/superior/remada-curvada.gif', import.meta.url).href,
  elevacaoLateral: new URL('../gifs/superior/elevacao-lateral.gif', import.meta.url).href,
  triceps: new URL('../gifs/superior/Triceps.webp', import.meta.url).href,
  abdominal: new URL('../gifs/superior/abdominal.gif', import.meta.url).href,
  elevacaoPelvica: new URL('../gifs/inferior/elevacao-pelvica.webp', import.meta.url).href,
  bulgaro: new URL('../gifs/inferior/bulgaro.gif', import.meta.url).href,
  coice: new URL('../gifs/inferior/coice.gif', import.meta.url).href
};

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  perLeg?: boolean;
  tip: string;
  gifUrl: string;
}

interface Workout {
  label: string;
  exercises?: Exercise[];
  type?: 'rest';
  restType?: 'recuperador' | 'total';
}

const treinos: Record<string, Workout> = {
  segunda: {
    label: 'QUADRÍCEPS E GLÚTEOS',
    exercises: [
      { name: 'Agachamento Livre', sets: 4, reps: 12, tip: 'Desça até as coxas ficarem paralelas ao chão.', gifUrl: gifs.agachamentoLivre },
      { name: 'Afundo', sets: 3, reps: 12, perLeg: true, tip: 'Desça até o joelho traseiro quase tocar o chão.', gifUrl: gifs.afundo },
      { name: 'Agachamento Sumô', sets: 4, reps: 12, tip: 'Mantenha os pés mais abertos e os joelhos alinhados.', gifUrl: gifs.agachamentoSumo },
      { name: 'Extensora', sets: 4, reps: 12, tip: 'Contraia os quadríceps no topo do movimento.', gifUrl: gifs.extensora },
      { name: 'Stiff', sets: 4, reps: 12, tip: 'Sinta o alongamento no posterior da coxa.', gifUrl: gifs.stiff }
    ]
  },
  terca: {
    label: 'SUPERIOR',
    exercises: [
      { name: 'Supino na Máquina', sets: 4, reps: 12, tip: 'Empurre com força e controle a descida.', gifUrl: gifs.supino },
      { name: 'Puxada Alta', sets: 4, reps: 12, tip: 'Puxe o peito em direção à barra.', gifUrl: gifs.puxadaAlta },
      { name: 'Remada Curvada', sets: 4, reps: 12, tip: 'Mantenha a coluna alinhada durante o movimento.', gifUrl: gifs.remadaCurvada },
      { name: 'Elevação Lateral', sets: 5, reps: 12, tip: 'Levante os braços com leve dobra no cotovelo.', gifUrl: gifs.elevacaoLateral },
      { name: 'Tríceps Máquina', sets: 4, reps: 12, tip: 'Controle a extensão e a volta do peso.', gifUrl: gifs.triceps },
      { name: 'Abdominal', sets: 4, reps: 15, tip: 'Mantenha o queixo levemente afastado do peito.', gifUrl: gifs.abdominal }
    ]
  },
  quarta: {
    label: 'DESCANSO',
    type: 'rest',
    restType: 'recuperador'
  },
  quinta: {
    label: 'POSTERIOR DE COXA E GLÚTEO',
    exercises: [
      { name: 'Elevação Pélvica', sets: 3, reps: 20, tip: 'Eleve os quadris até o corpo formar linha reta.', gifUrl: gifs.elevacaoPelvica },
      { name: 'Agachamento Sumô', sets: 4, reps: 12, tip: 'Foque no empurrar dos calcanhares.', gifUrl: gifs.agachamentoSumo },
      { name: 'Stiff', sets: 4, reps: 12, tip: 'Mantenha os ombros para trás e os joelhos levemente flexionados.', gifUrl: gifs.stiff },
      { name: 'Agachamento Búlgaro', sets: 3, reps: 12, perLeg: true, tip: 'Apoie o tronco firme e desça com controle.', gifUrl: gifs.bulgaro },
      { name: 'Coice no Elástico', sets: 3, reps: 12, perLeg: true, tip: 'Empurre o quadril para trás e contraia o glúteo.', gifUrl: gifs.coice }
    ]
  },
  sexta: {
    label: 'SUPERIOR',
    exercises: [
      { name: 'Supino na Máquina', sets: 4, reps: 12, tip: 'Empurre com força e controle a descida.', gifUrl: gifs.supino },
      { name: 'Puxada Alta', sets: 4, reps: 12, tip: 'Puxe o peito em direção à barra.', gifUrl: gifs.puxadaAlta },
      { name: 'Remada Curvada', sets: 4, reps: 12, tip: 'Mantenha a coluna alinhada durante o movimento.', gifUrl: gifs.remadaCurvada },
      { name: 'Elevação Lateral', sets: 5, reps: 12, tip: 'Levante os braços com leve dobra no cotovelo.', gifUrl: gifs.elevacaoLateral },
      { name: 'Tríceps Máquina', sets: 4, reps: 12, tip: 'Controle a extensão e a volta do peso.', gifUrl: gifs.triceps },
      { name: 'Abdominal', sets: 4, reps: 15, tip: 'Mantenha o queixo levemente afastado do peito.', gifUrl: gifs.abdominal }
    ]
  },
  sabado: {
    label: 'GLÚTEO ISOLADO',
    exercises: [
      { name: 'Agachamento Sumô', sets: 4, reps: 12, tip: 'Mantenha o core firme e os pés bem apoiados.', gifUrl: gifs.agachamentoSumo },
      { name: 'Coice no Elástico', sets: 3, reps: 12, perLeg: true, tip: 'Sinta o glúteo trabalhar em cada repetição.', gifUrl: gifs.coice },
      { name: 'Afundo', sets: 3, reps: 12, perLeg: true, tip: 'Mantenha o tronco ereto e o passo firme.', gifUrl: gifs.afundo },
      { name: 'Stiff', sets: 4, reps: 12, tip: 'Trabalhe a extensão do quadril com controle.', gifUrl: gifs.stiff }
    ]
  },
  domingo: {
    label: 'DESCANSO',
    type: 'rest',
    restType: 'total'
  }
};

const weekdayMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'] as const;

function App() {
  const [selectedDay, setSelectedDay] = useState<string>('segunda');

  const currentWorkout = treinos[selectedDay] ?? treinos.segunda;

  const currentDayKey = useMemo(() => {
    const today = new Date().getDay();
    return weekdayMap[today] ?? 'segunda';
  }, []);

  useEffect(() => {
    setSelectedDay(currentDayKey);
  }, [currentDayKey]);

  useEffect(() => {
    const link = document.querySelector('link[rel="icon"]');
    if (link) {
      link.setAttribute('href', appIconHref);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-800">
      <header className="sticky top-0 z-30 bg-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:text-left">
            <div className="flex items-center gap-3">
              <img src={appIconHref} alt="Ícone de peso" title="Ícone de peso" className="h-12 w-12 rounded-2xl bg-white/15 p-2 object-contain" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Meu Cronograma de Treinos</h1>
                <p className="text-sm text-blue-100">Treinos completos com foco em força e forma</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-blue-100 text-sm md:text-base">
            Semana dedicada ao seu bem-estar e evolução
          </p>
        </div>
      </header>

      <div className="sticky top-[96px] z-20 bg-white shadow-md border-b-2 border-blue-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide py-1">
            {dias.map((dia) => (
              <button
                key={dia.key}
                type="button"
                onClick={() => setSelectedDay(dia.key)}
                className={`min-w-[4.5rem] px-5 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  selectedDay === dia.key
                    ? 'bg-blue-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                }`}
              >
                {dia.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-5xl px-4 py-8">
        <section className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">{currentWorkout.label}</h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-blue-800"></div>
        </section>

        <section className="space-y-6">
          {currentWorkout.type === 'rest' ? (
            <RestDay type={currentWorkout.restType ?? 'recuperador'} />
          ) : (
            <div className="space-y-6">
              {currentWorkout.exercises?.map((exercise, index) => (
                <ExerciseCard key={`${exercise.name}-${index}`} {...exercise} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">
            💪 Continue firme! Cada treino é um passo rumo aos seus objetivos.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
