import { Link } from 'react-router-dom';
import { tracks } from '../data';
import { continueLesson, passedLessons, programCount } from '../lib/curriculum';
import { useProgress } from '../lib/progress';

export function HomePage() {
  const { store } = useProgress();
  const total = programCount();

  return (
    <main className="screen">
      <header className="top">
        <div>
          <p className="brand">TechShala</p>
          <h1>Let’s study</h1>
          <p className="lede">Read the program, pick what it does, then see why that answer is correct.</p>
        </div>
        <Link className="icon-button" to="/history" aria-label="Open history">
          <HistoryIcon />
        </Link>
      </header>

      <p className="stat-line">{total} programs · Python, JavaScript, and Java · basic to advanced</p>

      <section className="track-list">
        {tracks.map((track) => {
          const done = passedLessons(track, store);
          const next = continueLesson(track, store);
          const programs = programCount(track);
          return (
            <article className={`track-card lang-${track.id}`} key={track.id}>
              <div className="track-card-top">
                <h2>{track.name}</h2>
                <span>{done}/{track.lessons.length} lessons</span>
              </div>
              <p>{track.blurb}</p>
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${(done / track.lessons.length) * 100}%` }} />
              </div>
              <div className="track-card-foot">
                <span>{programs} programs</span>
                <Link className="btn" to={`/learn/${track.id}`}>
                  {done === 0 ? 'Start' : done === track.lessons.length ? 'Review' : `Continue · ${next.title}`}
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function HistoryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
