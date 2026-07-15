import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import AppShell from './components/AppShell';
import { ROUTES } from './app/routes';
import { useAuthStore } from './state/authStore';
import LoginScreen from './screens/LoginScreen';

/** Minimal loading state while lazy screens resolve. */
const ScreenLoader = () => (
  <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-pencil/30 border-t-marigold" />
  </div>
);

const App = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginScreen />} />
        ) : (
          <Route element={<AppShell />}>
            {ROUTES.map((r) => (
              <Route
                key={r.id}
                path={r.path}
                element={
                  <Suspense fallback={<ScreenLoader />}>
                    <r.component />
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
