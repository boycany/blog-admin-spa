import { Article } from '../article/articles';

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Angular Signals: The What and Why of Signals',
    content: `A signal is a container that holds a value.
      Unlike normal variables, a signal provides a notification when it’s changed.
      Signal = Data Value + Change Notification`,
    author: 'Red Chien',
    tags: ['tech', 'angular', 'signals'],
    status: 'published',
    createdDate: '2025-10-01T10:00:00Z',
    modifiedDate: '2025-10-02T12:00:00Z',
  },
  {
    id: 2,
    title: 'Why Dependency Injection Exists?',
    content: `In nestJS, Controller, Service, Repository, there is a very clear dependency
      or hierarchy between these different classes. The service depends upon the repository to work correctly.
      Likewise, the controller depends upon the service. Between these three classes, there are very clearly dependency.`,
    author: 'Red Chien',
    tags: ['tech', 'nestjs', 'di'],
    status: 'draft',
    createdDate: '2025-10-01T11:00:00Z',
    modifiedDate: '2025-10-01T11:00:00Z',
  },
];
