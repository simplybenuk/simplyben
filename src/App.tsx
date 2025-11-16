import { HashRouter, Route, Routes } from 'react-router-dom';
import { ChapterOne } from './chapters/chapter1/ChapterOne';
import { OutOfBounds } from './components/OutOfBounds';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ChapterOne />} />
        <Route path="*" element={<OutOfBounds />} />
      </Routes>
    </HashRouter>
  );
}
