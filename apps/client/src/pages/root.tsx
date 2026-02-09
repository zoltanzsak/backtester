import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Outlet } from '@tanstack/react-router';

export function Root() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
