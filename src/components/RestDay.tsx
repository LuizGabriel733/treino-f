interface RestDayProps {
  type: 'recuperador' | 'total';
}

export function RestDay({ type }: RestDayProps) {
  const isRecuperador = type === 'recuperador';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-glow p-8 md:p-12 border border-blue-300">
        <div className="text-center">
          <div className="text-6xl mb-6">{isRecuperador ? '💆‍♂️' : '🛌'}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {isRecuperador ? 'Descanso Recuperador' : 'Descanso Total'}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {isRecuperador
              ? 'Dia dedicado à recuperação ativa e mobilidade.'
              : 'Dia de descanso completo. Prepare-se para a próxima semana!'}
          </p>
          <div className="bg-blue-800 text-white rounded-3xl p-6 text-left">
            <h3 className="text-xl font-semibold mb-3">
              {isRecuperador ? '💡 Sugestões para Hoje' : '💡 Foco de Hoje'}
            </h3>
            <ul className="space-y-2 text-sm leading-7">
              {isRecuperador ? (
                <>
                  <li>• Alongamento leve (15-20 minutos)</li>
                  <li>• Caminhada ou yoga suave</li>
                  <li>• Massagem ou liberação miofascial</li>
                  <li>• Hidratação reforçada</li>
                </>
              ) : (
                <>
                  <li>• Descanso completo do treino</li>
                  <li>• Prepare suas refeições da semana</li>
                  <li>• Durma bem (7-9 horas)</li>
                  <li>• Reflita sobre os treinos da semana</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
