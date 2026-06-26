// STEP 2 — Shared placeholder used by every screen until its real step.
// Keeps the shell navigable now and gives each screen a consistent look so
// the routing can be visually verified before real UI is built.
import type { FC, ReactNode } from 'react';

interface ScreenPlaceholderProps {
  title: string;
  /** Which build step will replace this placeholder, e.g. "Step 4". */
  builtIn: string;
  /** Short description of what the finished screen will do. */
  description?: ReactNode;
}

const ScreenPlaceholder: FC<ScreenPlaceholderProps> = ({ title, builtIn, description }) => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-pencil/30 bg-paper p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        <p className="font-hud text-[10px] uppercase tracking-[0.3em] text-pencil">
          Placeholder · built in {builtIn}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">{title}</h1>
        {description ? (
          <p className="mt-3 font-body text-sm leading-relaxed text-pencil">{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ScreenPlaceholder;
