import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Account, UserProfile } from './core/services/auth-service';
import { USER_ACCOUNTS } from './mock-data/user-accounts';
import { USER_PROFILES } from './mock-data/user-profiles';

export class AppData implements InMemoryDbService {
  // Creates the 'in memory' database
  // Can then issue http requests to retrieve this data,
  // just as if the data were located on a backend server
  createDb(): InMemoryDb {
    const userAccounts = USER_ACCOUNTS;
    const userProfiles = USER_PROFILES;
    return { userProfiles };
  }
}

interface InMemoryDb {
  // userAccounts: Account[];
  userProfiles: UserProfile[];
}
