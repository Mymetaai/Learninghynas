// STEP 2 — TEMPORARY dev navigation.
// The spec requires every screen to be reachable now, but the real in-app
// flows (pin → preview → story → practice → completion, etc.) don't exist
// until later steps. This bottom nav lets the routing be exercised. It is
// removed once the real flows are wired (no later than Step 9).
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../app/routes';

const DevNav = () => {
  return (
    <nav
      aria-label="Developer screen navigation"
      className="sticky bottom-0 z-40 border-t border-pencil/20 bg-ink/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-2 py-2">
        {ROUTES.map((r) => (
          <NavLink
            key={r.id}
            to={r.path}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-md px-2.5 py-1 font-hud text-[11px] transition-colors ${
                isActive
                  ? 'bg-terracotta text-paper'
                  : 'text-pencil hover:bg-pencil/10 hover:text-paper'
              }`
            }
          >
            {r.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default DevNav;
