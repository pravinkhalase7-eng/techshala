import { Link, Navigate, useParams } from 'react-router-dom';
import { LEVELS, getTrack, isUnlocked, lessonKey } from '../lib/curriculum';
import { useProgress } from '../lib/progress';

export function TrackPage() {
  const { languageId } = useParams();
  const track = getTrack(languageId);
  const { store, setUnlockAll } = useProgress();
  if (!track) return <Navigate to="/" replace />;

  return (
    <main className="screen">
      <header className="top compact">
        <Link className="icon-button" to="/" aria-label="Back to languages">
          <Arrow />
        </Link>
        <div>
          <p className="brand">{track.name}</p>
          <h1>Step by step</h1>
          <p className="lede">
            {store.unlockAll
              ? 'Every lesson is open. Turn this off to follow the path in order again.'
              : 'Score at least 70% to unlock the next lesson. Every program explains why the answer is correct.'}
          </p>
        </div>
      </header>

      <button
        className={`unlock-toggle ${store.unlockAll ? 'on' : ''}`}
        type="button"
        aria-pressed={store.unlockAll}
        onClick={() => setUnlockAll(!store.unlockAll)}
      >
        <span>Unlock all</span>
        <span className="switch" aria-hidden="true" />
      </button>

      {LEVELS.map((level) => {
        const lessons = track.lessons
          .map((lesson, index) => ({ lesson, index }))
          .filter((item) => item.lesson.level === level.id);
        return (
          <section className="level-block" key={level.id}>
            <h2 className={`level-label ${level.id}`}>{level.label}</h2>
            <ol className="path">
              {lessons.map(({ lesson, index }) => {
                const unlocked = isUnlocked(track, index, store);
                const progress = store.lessons[lessonKey(track.id, lesson.id)];
                const best = progress ? Math.round((progress.bestCorrect / progress.bestTotal) * 100) : null;
                return (
                  <li key={lesson.id} className={unlocked ? '' : 'locked'}>
                    <span className="step">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{lesson.title}</h3>
                      <p>{lesson.summary}</p>
                      <p className="meta">
                        {lesson.questions.length} programs
                        {best !== null ? ` · best ${best}%` : ''}
                        {progress?.passed ? ' · cleared' : ''}
                        {!unlocked ? ' · locked' : ''}
                      </p>
                    </div>
                    {unlocked ? (
                      <Link className="btn small" to={`/learn/${track.id}/${lesson.id}`}>
                        {progress?.passed ? 'Review' : progress ? 'Retry' : 'Start'}
                      </Link>
                    ) : (
                      <span className="lock" aria-label="Locked">Lock</span>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
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
