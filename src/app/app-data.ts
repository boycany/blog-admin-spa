import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserProfile } from './core/services/auth-service';
import { USER_PROFILES } from './mock-data/user-profiles';
import { Article, Articles } from './article/articles';
import { ARTICLES } from './mock-data/articles';

export class AppData implements InMemoryDbService {
  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb(): InMemoryDb {
    const userProfiles = USER_PROFILES;
    const articles = ARTICLES;
    return { userProfiles, articles };
  }
}

interface InMemoryDb {
  userProfiles: UserProfile[];
  articles: Article[];
}
