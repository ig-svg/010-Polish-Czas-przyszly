import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Trophy,
  Brain,
  ChevronRight,
  ChevronLeft,
  List,
  ExternalLink,
} from "lucide-react";

/**
 * ⚙️ НАЛАШТУВАННЯ ДЛЯ КОРИСТУВАЧА
 */
const GOOGLE_DOC_URL = "#";
const NEXT_APP_URL = "#"; // Посилання на ТЕМУ 11 (Przymiotnik)
const PREV_APP_URL = "#"; // Посилання на ТЕМУ 9
const MENU_APP_URL = "#";

// --- БАЗА ПИТАНЬ (50 шт) - CZAS PRZYSZŁY ZŁOŻONY ---
const QUESTIONS_DB = [
  // --- Відмінювання BYĆ (Бути) у майбутньому ---
  {
    text: "Ja ______ (być) w domu.",
    options: ["będę", "będziesz", "będzie"],
    correct: 0,
    explanation: "Ja będę.",
  },
  {
    text: "Ty ______ (być) czytać.",
    options: ["będziesz", "będę", "będzie"],
    correct: 0,
    explanation: "Ty będziesz.",
  },
  {
    text: "On ______ (być) pracował.",
    options: ["będzie", "będą", "będziemy"],
    correct: 0,
    explanation: "On będzie.",
  },
  {
    text: "My ______ (być) pisać.",
    options: ["będziemy", "będziecie", "będą"],
    correct: 0,
    explanation: "My będziemy.",
  },
  {
    text: "Wy ______ (być) słuchać.",
    options: ["będziecie", "będziemy", "będą"],
    correct: 0,
    explanation: "Wy będziecie.",
  },
  {
    text: "Oni ______ (być) spać.",
    options: ["będą", "będzie", "będziemy"],
    correct: 0,
    explanation: "Oni będą.",
  },
  {
    text: "Ona ______ (być) gotowała.",
    options: ["będzie", "będę", "będziesz"],
    correct: 0,
    explanation: "Ona będzie.",
  },
  {
    text: "Jutro (ja) nie ______ (być) w szkole.",
    options: ["będę", "będziesz", "będzie"],
    correct: 0,
    explanation: "Ja będę.",
  },
  {
    text: "Czy pan ______ (być) czekał?",
    options: ["będzie", "będą", "będziesz"],
    correct: 0,
    explanation: "Pan będzie (3 особа).",
  },
  {
    text: "Dzieci ______ (być) się bawić.",
    options: ["będą", "będzie", "będziemy"],
    correct: 0,
    explanation: "Dzieci (Oni/One) będą.",
  },

  // --- Варіант А: Będę + Інфінітив (Простий) ---
  {
    text: "Jutro ______ (czytać) książkę.",
    options: ["będę czytać", "będę czytam", "będę czytasz"],
    correct: 0,
    explanation: "Będę + Інфінітив.",
  },
  {
    text: "My ______ (pracować) długo.",
    options: ["będziemy pracować", "będziemy pracujemy", "będą pracować"],
    correct: 0,
    explanation: "Będziemy + Інфінітив.",
  },
  {
    text: "Czy ty ______ (spać)?",
    options: ["będziesz spać", "będziesz śpisz", "będę spać"],
    correct: 0,
    explanation: "Ty będziesz + Інфінітив.",
  },
  {
    text: "Oni ______ (grać) w piłkę.",
    options: ["będą grać", "będą grają", "będzie grać"],
    correct: 0,
    explanation: "Oni będą + Інфінітив.",
  },
  {
    text: "Ona nie ______ (robić) tego.",
    options: ["będzie robić", "będzie robi", "będzie robiłać"],
    correct: 0,
    explanation: "Ona będzie + Інфінітив.",
  },
  {
    text: "Wy ______ (oglądać) film.",
    options: ["będziecie oglądać", "będziecie oglądacie", "będziemy oglądać"],
    correct: 0,
    explanation: "Wy będziecie + Інфінітив.",
  },
  {
    text: "Ja ______ (pisać) maila.",
    options: ["będę pisać", "będę piszę", "będę pisał"],
    correct: 0,
    explanation: "Będę pisać (варіант з інфінітивом).",
  },
  {
    text: "Kiedy ______ (wracać)?",
    options: ["będziesz wracać", "będziesz wracasz", "będę wracać"],
    correct: 0,
    explanation: "Ty będziesz + Інфінітив.",
  },
  {
    text: "My ______ (uczyć się).",
    options: ["będziemy się uczyć", "będziemy się uczymy", "będą się uczyć"],
    correct: 0,
    explanation: "Będziemy + Інфінітив.",
  },
  {
    text: "On ______ (jeść) obiad.",
    options: ["będzie jeść", "będzie je", "będzie jadł"],
    correct: 0,
    explanation: "Będzie jeść (варіант з інфінітивом).",
  },

  // --- Варіант Б: Będę + Минулий час (Елегантний) ---
  {
    text: "(Ja - чоловік) Jutro ______ (pracować).",
    options: ["będę pracował", "będę pracować", "będę pracowała"],
    correct: 0,
    explanation: "Чоловік: Będę + -ł (3 особа мин. часу).",
  },
  {
    text: "(Ja - жінка) Jutro ______ (pracować).",
    options: ["będę pracowała", "będę pracował", "będę pracowało"],
    correct: 0,
    explanation: "Жінка: Będę + -ła.",
  },
  {
    text: "(Ty - чоловік) Co ______ (robić)?",
    options: ["będziesz robił", "będziesz robiła", "będziesz robić"],
    correct: 0,
    explanation: "Чоловік: Będziesz + -ł.",
  },
  {
    text: "(Ty - жінка) Co ______ (robić)?",
    options: ["będziesz robiła", "będziesz robił", "będziesz robić"],
    correct: 0,
    explanation: "Жінка: Będziesz + -ła.",
  },
  {
    text: "On ______ (czytać).",
    options: ["będzie czytał", "będzie czytała", "będzie czytać"],
    correct: 0,
    explanation: "On + -ł.",
  },
  {
    text: "Ona ______ (pisać).",
    options: ["będzie pisała", "będzie pisał", "będzie pisać"],
    correct: 0,
    explanation: "Ona + -ła.",
  },
  {
    text: "Dziecko ______ (spać).",
    options: ["będzie spało", "będzie spał", "będzie spała"],
    correct: 0,
    explanation: "Ono + -ło.",
  },
  {
    text: "My (chłopcy) ______ (grać).",
    options: ["będziemy grali", "będziemy grały", "będziemy grać"],
    correct: 0,
    explanation: "Чоловіча група: -li.",
  },
  {
    text: "Wy (dziewczyny) ______ (biegać).",
    options: ["będziecie biegały", "będziecie biegali", "będziecie biegać"],
    correct: 0,
    explanation: "Жіноча група: -ły.",
  },
  {
    text: "Oni ______ (rozmawiać).",
    options: ["będą rozmawiali", "będą rozmawiały", "będą rozmawiać"],
    correct: 0,
    explanation: "Oni (чоловіки): -li.",
  },

  // --- Види дієслова: Dokonany vs Niedokonany (УВАГА!) ---
  {
    text: "Jutro cały dzień ______ (czytać - niedokonany).",
    options: ["będę czytać", "przeczytam", "będę przeczytać"],
    correct: 0,
    explanation: "Процес (cały dzień) -> Będę czytać.",
  },
  {
    text: "Jutro w końcu ______ (przeczytać - dokonany) tę książkę.",
    options: ["przeczytam", "będę przeczytać", "będę czytał"],
    correct: 0,
    explanation:
      "Результат (w końcu) -> Простий майбутній (Przeczytam). 'Będę przeczytać' - ПОМИЛКА!",
  },
  {
    text: "My ______ (budować - proces) dom.",
    options: ["będziemy budować", "zbudujemy", "będziemy zbudować"],
    correct: 0,
    explanation: "Процес -> Będziemy budować.",
  },
  {
    text: "My ______ (zbudować - rezultat) dom w rok.",
    options: ["zbudujemy", "będziemy budować", "będziemy zbudować"],
    correct: 0,
    explanation: "Результат -> Zbudujemy (без 'będziemy').",
  },
  {
    text: "Ona ______ (pisać) list przez godzinę.",
    options: ["będzie pisała", "napisze", "będzie napisała"],
    correct: 0,
    explanation: "Процес (przez godzinę) -> Będzie pisała.",
  },
  {
    text: "Ona ______ (napisać) list i wyśle go.",
    options: ["napisze", "będzie pisać", "będzie napisać"],
    correct: 0,
    explanation: "Результат -> Napisze.",
  },
  {
    text: "Zaraz ______ (zrobić) kawę.",
    options: ["zrobię", "będę robić", "będę zrobić"],
    correct: 0,
    explanation: "Результат (конкретна дія) -> Zrobię.",
  },
  {
    text: "Zawsze ______ (robić) zakupy w soboty.",
    options: ["będę robić", "zrobię", "będę zrobić"],
    correct: 0,
    explanation: "Регулярність -> Będę robić.",
  },
  {
    text: "Nie ______ (zjeść - dokonany) tego!",
    options: ["zjem", "będę jeść", "będę zjeść"],
    correct: 0,
    explanation: "Результат -> Zjem. 'Będę zjeść' не існує.",
  },
  {
    text: "Kiedy ______ (sprzątać)?",
    options: ["będziesz sprzątać", "posprzątasz", "będziesz posprzątać"],
    correct: 0,
    explanation: "Питання про процес -> Będziesz sprzątać.",
  },

  // --- Мікс ---
  {
    text: "Ja ______ (iść) do kina.",
    options: ["będę szedł", "będę iść", "będę szła"],
    correct: 0,
    explanation:
      "Iść -> Będę szedł (чоловік) або Będę iść (універсально, але тут варіант szedł кращий).",
  },
  {
    text: "Ona ______ (iść) z nami.",
    options: ["będzie szła", "będzie szedła", "będzie idzie"],
    correct: 0,
    explanation: "Ona będzie szła.",
  },
  {
    text: "My ______ (jeść) kolację.",
    options: ["będziemy jedli", "będziemy jadły", "będziemy jeść"],
    correct: 0,
    explanation: "Będziemy jedli (чоловіки).",
  },
  {
    text: "Oni ______ (mieć) problem.",
    options: ["będą mieli", "będą miały", "będą mieć"],
    correct: 0,
    explanation: "Oni będą mieli.",
  },
  {
    text: "Wy ______ (móc) to zrobić.",
    options: ["będziecie mogli", "będziecie mogły", "będziecie móc"],
    correct: 0,
    explanation: "Wy będziecie mogli.",
  },
  {
    text: "Czy ty ______ (musieć) pracować?",
    options: ["będziesz musiał", "będziesz musieć", "będziesz musisz"],
    correct: 0,
    explanation: "Będziesz musiał (-ał).",
  },
  {
    text: "Jutro ______ (padać) deszcz.",
    options: ["będzie padał", "będzie padać", "popada"],
    correct: 0,
    explanation: "Będzie padał (Deszcz - on).",
  },
  {
    text: "Słońce ______ (świecić).",
    options: ["będzie świeciło", "będzie świecił", "będzie świecić"],
    correct: 0,
    explanation: "Słońce (ono) -ło.",
  },
  {
    text: "Co ______ (robić - wy)?",
    options: ["będziecie robić", "będziecie robili", "zrobicie"],
    correct: 0,
    explanation: "Варіант з інфінітивом універсальний.",
  },
  {
    text: "Gdzie ______ (mieszkać)?",
    options: ["będziesz mieszkać", "będziesz mieszkał", "zamieszkasz"],
    correct: 0,
    explanation: "Процес проживання -> Będziesz mieszkać.",
  },
];

const PolishTrainerT10 = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  // Ініціалізація
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...QUESTIONS_DB].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setCompleted(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    const question = shuffledQuestions[currentQIndex];
    const correct = index === question.correct;

    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  // --- RENDERERS ---

  if (shuffledQuestions.length === 0)
    return <div className="p-10 text-center">Завантаження...</div>;

  const question = shuffledQuestions[currentQIndex];
  const progressPercentage = Math.round(
    (currentQIndex / shuffledQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              A1
            </span>
            <h1 className="font-bold text-slate-800 truncate">
              Тема 10: Czas przyszły
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Назад */}
            <a
              href={PREV_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                PREV_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Попередня тема"
            >
              <ChevronLeft size={24} />
            </a>

            {/* МЕНЮ */}
            <a
              href={MENU_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                MENU_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Усі теми"
            >
              <List size={24} />
            </a>

            {/* Вперед */}
            <a
              href={NEXT_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                NEXT_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Наступна тема"
            >
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* 2. THEORY BLOCK (Collapsible) */}
        <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => setShowTheory(!showTheory)}
            className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BookOpen size={20} />
              <span>Експрес-правила</span>
            </div>
            <span className="text-xs text-slate-400">
              {showTheory ? "Згорнути" : "Показати"}
            </span>
          </div>

          {showTheory && (
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <p>
                <b>Czas przyszły złożony</b> — використовується тільки для
                ПРОЦЕСУ (недоконаний вид).
              </p>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <strong className="block text-blue-800">
                    1. Варіант А (Простий):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <b>Będę</b> + Інфінітив.
                    </li>
                    <li>
                      <i>Będę czytać</i> (Буду читати).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-green-50 rounded border border-green-100">
                  <strong className="block text-green-800">
                    2. Варіант Б (Елегантний):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <b>Będę</b> + Минулий час (3 особа).
                    </li>
                    <li>
                      <i>Będę czytał</i> (чол) / <i>Będę czytała</i> (жін).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <strong className="block text-red-800">⚠️ ПОМИЛКА:</strong>
                  <span className="text-xs">
                    Не можна: <i>Będę napisać</i> (Доконаний вид). Тільки:{" "}
                    <i>Napiszę</i>.
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href={GOOGLE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    GOOGLE_DOC_URL === "#"
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }`}
                >
                  <ExternalLink size={14} />
                  {GOOGLE_DOC_URL === "#"
                    ? "Детальні правила (Скоро)"
                    : "Відкрити повні правила"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. GAME ZONE */}
        {!completed ? (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Питання {currentQIndex + 1} з {shuffledQuestions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                let btnClass =
                  "p-4 rounded-xl font-semibold text-lg transition-all border-2 text-left relative ";

                if (showFeedback) {
                  if (idx === question.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (selectedOption === idx) {
                    btnClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-300";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-[0.98]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showFeedback}
                    className={btnClass}
                  >
                    {opt}
                    {showFeedback && idx === question.correct && (
                      <Check
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {showFeedback &&
                      idx !== question.correct &&
                      selectedOption === idx && (
                        <X
                          size={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {!isCorrect && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-4 text-sm border border-red-100 flex gap-3 items-start">
                    <Brain size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>Підказка:</strong> {question.explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isCorrect
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-800 hover:bg-slate-900 shadow-slate-300"
                  }`}
                >
                  {currentQIndex < shuffledQuestions.length - 1
                    ? "Далі"
                    : "Завершити"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {score === shuffledQuestions.length ? (
                <Trophy size={80} className="text-yellow-500 mx-auto" />
              ) : score >= shuffledQuestions.length * 0.8 ? (
                <Trophy size={80} className="text-blue-500 mx-auto" />
              ) : (
                <RefreshCw size={80} className="text-slate-300 mx-auto" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {score === shuffledQuestions.length
                ? "Ідеально!"
                : "Тренування завершено!"}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Ваш результат: <strong className="text-slate-800">{score}</strong>{" "}
              з {shuffledQuestions.length}
            </p>

            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Почати знову
            </button>
          </div>
        )}
      </main>

      {!completed && (
        <footer className="bg-white border-t border-slate-100 p-4">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Прогрес</span>
              <span>
                {Math.round((score / (currentQIndex + 1)) * 100) || 0}% Успіху
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PolishTrainerT10;
