import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from './lib/progress';
import { FinishPage } from './pages/FinishPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { TrackPage } from './pages/TrackPage';

export function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/learn/:languageId" element={<TrackPage />} />
            <Route path="/learn/:languageId/:lessonId" element={<QuizPage />} />
            <Route path="/learn/:languageId/:lessonId/results" element={<FinishPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ProgressProvider>
    </BrowserRouter>
  );
}
