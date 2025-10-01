import { computed, Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // mock data
  private _adminAccounts = signal<Account[]>([
    {
      id: 1,
      email: 'admin@example.com',
      password: '1QAZ2wsx',
    },
  ]);
  adminAccounts = computed(() => this._adminAccounts());

  // user state
  private _currentUser = signal<Account | null>(null);
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._currentUser());

  // mock login
  login(email: string, password: string): Observable<boolean> {
    const account = this.adminAccounts().find(
      (acc) => acc.email === email && acc.password === password,
    );

    if (account) {
      this._currentUser.set(account);
    } else {
      this._currentUser.set(null);
    }

    const result: Observable<boolean> = account ? of(true) : of(false);

    return result.pipe(delay(500));
  }
}

export interface Account {
  id: number;
  email: string;
  password: string;
}
