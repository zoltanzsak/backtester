import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Root } from '../pages/root.tsx';

const rootRoute = createRootRoute({
  component: Root,
});

// TODO: Implement routing
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => <>Hello world</>,
  path: '/',
});

const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
  routeTree,
});
