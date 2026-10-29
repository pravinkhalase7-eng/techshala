import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { getTrack, isUnlocked, lessonKey, neededToPass } from '../lib/curriculum';
import { useProgress } from '../lib/progress';

type ResultState = { choices?: number[] };

export function FinishPage() {
  const { languageId, lessonId } = useParams();
  const location = useLocation();
  const { store } = useProgress();
  const track = getTrack(languageId);
  const lessonIndex = track?.lessons.findIndex((lesson) => lesson.id === lessonId) ?? -1;
  const lesson = lessonIndex >= 0 ? track?.lessons[lessonIndex] : undefined;
  const choices = (location.state as ResultState | null)?.choices;

  if (!track || !lesson) return <Navigate to="/" replace />;
  if (!choices || choices.length !== lesson.questions.length) {
    return <Navigate to={`/learn/${track.id}/${lesson.id}`} replace />;
  }

  const correct = choices.filter((choice, index) => choice === lesson.questions[index].answer).length;
  const total = lesson.questions.length;
  const passed = correct >= neededToPass(total);
  const percent = Math.round((correct / total) * 100);
  const next = track.lessons[lessonIndex + 1];
  const nextUnlocked = next ? isUnlocked(track, lessonIndex + 1, store) : false;
  const progress = store.lessons[lessonKey(track.id, lesson.id)];

  return (
    <main className="screen">
      <header className="top">
        <div>
          <p className="brand">{track.name}</p>
          <h1>{passed ? 'Lesson cleared' : 'Keep going'}</h1>
          <p className="lede">{lesson.title}</p>
        </div>
      </header>

      <section className={`score-card ${passed ? 'passed' : ''}`}>
        <p className="score">{correct}<span>/{total}</span></p>
        <p>{percent}% · {passed ? 'Next lesson is open.' : `Score ${neededToPass(total)} of ${total} to unlock the next lesson.`}</p>
        {progress && <p className="meta">Best score {progress.bestCorrect}/{progress.bestTotal} · {progress.attempts} attempt{progress.attempts === 1 ? '' : 's'}</p>}
      </section>

      <div className="finish-actions">
        <Link className="btn" to={`/learn/${track.id}/${lesson.id}`}>Try again</Link>
        {next && nextUnlocked && <Link className="btn ghost" to={`/learn/${track.id}/${next.id}`}>Next: {next.title}</Link>}
        <Link className="btn ghost" to={`/learn/${track.id}`}>Back to path</Link>
      </div>

      <section className="review">
        <h2>Why each answer is correct</h2>
        {lesson.questions.map((question, index) => {
          const picked = choices[index];
          const right = picked === question.answer;
          return (
            <details key={question.id} open={!right}>
              <summary>
                <span>Program {index + 1}</span>
                <strong>{right ? 'Correct' : 'Review'}</strong>
              </summary>
              <pre>{question.code}</pre>
              <p className="ask">{question.ask}</p>
              <p>You chose {picked === null || picked === undefined ? 'nothing' : question.options[picked]}</p>
              <p className="why-answer">Correct: {question.options[question.answer]}</p>
              <p>{question.why}</p>
            </details>
          );
        })}
      </section>
    </main>
  );
}
