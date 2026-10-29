import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { CodeBlock } from '../components/CodeBlock';
import { Dialog } from '../components/Dialog';
import { getTrack, isUnlocked } from '../lib/curriculum';
import { useProgress } from '../lib/progress';
import type { Lesson } from '../types';

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizPage() {
  const { languageId, lessonId } = useParams();
  const navigate = useNavigate();
  const { store, record } = useProgress();
  const track = getTrack(languageId);
  const lessonIndex = track?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1;
  const lesson = lessonIndex >= 0 ? track?.lessons[lessonIndex] : undefined;
  const unlocked = track && lesson ? isUnlocked(track, lessonIndex, store) : false;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [choices, setChoices] = useState<number[]>([]);
  const [hint, setHint] = useState(false);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (leave) return;
      if (!lesson) return;
      const question = lesson.questions[index];
      if (!question) return;
      if (event.key >= '1' && event.key <= '4' && !revealed) {
        setSelected(Number(event.key) - 1);
        setHint(false);
      }
        if (event.key === 'Enter') {
        event.preventDefault();
        if (revealed) goNext(lesson);
        else confirm();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!track || !lesson) return <Navigate to="/" replace />;
  if (!unlocked) return <Navigate to={`/learn/${track.id}`} replace />;

  const question = lesson.questions[index];
  const progress = ((index + 1) / lesson.questions.length) * 100;

  function confirm() {
    if (selected === null) {
      setHint(true);
      return;
    }
    setRevealed(true);
    setHint(false);
  }

  function goNext(currentLesson: Lesson) {
    if (selected === null) return;
    const nextChoices = [...choices, selected];
    const correct = nextChoices.filter((choice, choiceIndex) => choice === currentLesson.questions[choiceIndex].answer).length;
    if (index < currentLesson.questions.length - 1) {
      setChoices(nextChoices);
      setIndex((value) => value + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }
    record({
      languageId: track!.id,
      languageName: track!.name,
      lessonId: currentLesson.id,
      lessonTitle: currentLesson.title,
      correct,
      total: currentLesson.questions.length,
      passed: correct / currentLesson.questions.length >= 0.7,
    });
    navigate(`/learn/${track!.id}/${currentLesson.id}/results`, { state: { choices: nextChoices } });
  }

  const correctOption = question.options[question.answer];

  return (
    <main className="screen quiz">
      <header className="quiz-head">
        <div className="quiz-title">
          <button className="icon-button" type="button" aria-label="Leave lesson" onClick={() => setLeave(true)}>
            <Arrow />
          </button>
          <div>
            <p className="brand">{track.name} · {lesson.level}</p>
            <h1>{lesson.title}</h1>
          </div>
        </div>
        <div className="quiz-count">
          <span>Program {index + 1}</span>
          <span>{index + 1}/{lesson.questions.length}</span>
        </div>
        <div className="meter" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      </header>

      <div className="quiz-body">
        <CodeBlock code={question.code} language={track.id} />
        <h2 className="ask">{question.ask}</h2>
        <div className="options" role="listbox" aria-label="Answers">
          {question.options.map((option, optionIndex) => {
            const classes = ['option'];
            if (!revealed && selected === optionIndex) classes.push('selected');
            if (revealed && optionIndex === question.answer) classes.push('correct');
            if (revealed && selected === optionIndex && optionIndex !== question.answer) classes.push('wrong');
            return (
              <button
                key={option}
                type="button"
                className={classes.join(' ')}
                onClick={() => {
                  if (revealed) return;
                  setSelected(optionIndex);
                  setHint(false);
                }}
                aria-pressed={selected === optionIndex}
              >
                <span className="letter">{LETTERS[optionIndex]}</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
        {hint && <p className="hint">Choose an option, then confirm.</p>}
        {revealed && (
          <section className="why" aria-live="polite">
            <h3>Why this is correct</h3>
            <p className="why-answer">
              {LETTERS[question.answer]}. {correctOption}
            </p>
            <p>{question.why}</p>
          </section>
        )}
      </div>

      <footer className="dock">
        {revealed ? (
            <button className="btn" type="button" onClick={() => goNext(lesson)}>
            {index === lesson.questions.length - 1 ? 'See results' : 'Next program'}
          </button>
        ) : (
          <button className="btn" type="button" onClick={confirm}>Confirm</button>
        )}
      </footer>

      {leave && (
        <Dialog
          title="Leave this lesson?"
          message="This attempt will not be saved. You can start it again from the path."
          confirmLabel="Leave"
          cancelLabel="Stay"
          onCancel={() => setLeave(false)}
          onConfirm={() => navigate(`/learn/${track.id}`)}
        />
      )}
    </main>
  );
}

function Arrow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
