import { Routes } from '@angular/router';

const articlesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'articles',
  },
  {
    path: 'articles',
    loadComponent: () => import('./articles').then((m) => m.Articles),
  },
  /*
    Set Article Route to easy scalability in the future.
    If we want to add a route for a single article, we can uncomment the following lines
  */
  // {
  //   path: 'articles/:id',
  //   loadComponent: () => import('./article').then((m) => m.Article),
  // }
];

export default articlesRoutes;
