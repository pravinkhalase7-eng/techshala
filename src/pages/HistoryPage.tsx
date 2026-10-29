import { Link } from 'react-router-dom';
import { useProgress } from '../lib/progress';

export function HistoryPage() {
  const { store } = useProgress();

  return (
    <main className="screen">
      <header className="top compact">
        <Link className="icon-button" to="/" aria-label="Back to languages">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <p className="brand">TechShala</p>
          <h1>History</h1>
          <p className="lede">Your latest lesson attempts on this device.</p>
        </div>
      </header>

      {store.history.length === 0 ? (
        <p className="empty">No attempts yet. Start with Python, JavaScript, or Java.</p>
      ) : (
        <ol className="history">
          {store.history.map((attempt) => (
            <li key={attempt.id}>
              <div>
                <h2>{attempt.lessonTitle}</h2>
                <p>{attempt.languageName} · {new Date(attempt.at).toLocaleString()}</p>
              </div>
              <strong className={attempt.passed ? 'good' : ''}>
                {attempt.correct}/{attempt.total}
              </strong>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
