const STEPS = ['入力', '確認', 'PDF保存'];

export default function StepIndicator({ currentStep }: { currentStep: 1 | 2 | 3 }) {
  return (
    <nav
      aria-label="進行状況"
      className="no-print w-full bg-white border-b border-gray-200"
    >
      <ol className="flex items-center justify-center gap-0 max-w-2xl mx-auto px-4 py-3">
        {STEPS.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = step === currentStep;
          const isDone = step < currentStep;

          return (
            <li key={label} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isDone
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {step}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isDone ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="mx-2 text-gray-300 text-sm">→</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
