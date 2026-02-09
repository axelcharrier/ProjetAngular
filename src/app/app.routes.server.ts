import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'update/:id',
    renderMode: RenderMode.Server,
  },
];
