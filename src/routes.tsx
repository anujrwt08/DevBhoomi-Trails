import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';

const ExplorePage = lazy(() => import('./pages/explore'));
const HiddenGemsPage = lazy(() => import('./pages/hidden-gems'));
const PlanTripPage = lazy(() => import('./pages/plan-trip'));
const ExperiencesPage = lazy(() => import('./pages/experiences'));
const WishlistPage = lazy(() => import('./pages/wishlist'));

// 404 routing by runtime:
const NotFoundPage = import.meta.env.DEV
  ? lazy(() => import('../dev-tools/src/PageNotFound'))
  : lazy(() => import('./pages/_404'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/explore', element: <ExplorePage /> },
  { path: '/hidden-gems', element: <HiddenGemsPage /> },
  { path: '/plan-trip', element: <PlanTripPage /> },
  { path: '/experiences', element: <ExperiencesPage /> },
  { path: '/wishlist', element: <WishlistPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path = '/' | '/explore' | '/hidden-gems' | '/plan-trip' | '/experiences' | '/wishlist';
export type Params = Record<string, string | undefined>;
