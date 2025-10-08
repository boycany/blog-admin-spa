import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, Observable, of, take, tap } from 'rxjs';
import { USER_ACCOUNTS } from '../../mock-data/user-accounts';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // inject
  private http = inject(HttpClient);

  // mock data
  private _adminAccounts = signal<Account[]>(USER_ACCOUNTS);
  adminAccounts = computed(() => this._adminAccounts());

  // user state
  private _currentUser = signal<UserProfile | null>(null);
  currentUser = computed(() => this._currentUser());
  isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    this.loadFromLocalStorage();
  }

  // mock login
  login(email: string, password: string): Observable<null | UserProfile> {
    const account = this.adminAccounts().find(
      (acc) => acc.email === email && acc.password === password,
    );

    if (!account) {
      return of(null).pipe(
        delay(1000),
        tap(() => this._currentUser.set(null)),
        take(1),
      );
    }

    // fetch user profile from 'backend'
    return this.http.get<UserProfile>(`api/userProfiles/${account.id}`).pipe(
      tap((profile) => this._currentUser.set(profile)),
      tap(() => this.saveInLocalStorage()),
      catchError((err) => {
        console.log('err', err);
        this._currentUser.set(null);
        return of(null);
      }),
    );
  }

  private saveInLocalStorage() {
    localStorage.setItem('blog-admin-user', JSON.stringify(this._currentUser()));
  }

  private loadFromLocalStorage() {
    const userData = localStorage.getItem('blog-admin-user');
    if (userData) {
      this._currentUser.set(JSON.parse(userData));
    }
  }

  logout() {
    this._currentUser.set(null);
    localStorage.removeItem('blog-admin-user');
  }
}

export interface Account {
  id: number;
  email: string;
  password: string;
}

export interface UserProfile extends Omit<Account, 'password'> {
  name: string;
  role: 'admin' | 'user';
  lastLoginDate: string;
  createdDate: string;
  modifiedDate: string;
}
