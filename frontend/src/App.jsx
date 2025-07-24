import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const Analytics = lazy(() => import('./components/Analytics'));
import PsychologistsList from './components/PsychologistsList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <h1>Psi Mammoliti</h1>
        <Suspense fallback={<p>Cargando estadísticas…</p>}>
          <Analytics />
        </Suspense>
        <PsychologistsList />
      </div>
    </QueryClientProvider>
  );
}
