import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, share, tap } from 'rxjs';
import { UserDetails } from './user-details';
import { SessionDetails } from './session-details';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  readonly baseUrl = 'http://localhost/inventory-app/api/web/users';
  private allUsers$ = new BehaviorSubject<UserDetails[]>([]);

  constructor(private http: HttpClient) { }

  watchAllCategories(): Observable<UserDetails[]> {
    return this.allUsers$.pipe(filter(maybe => !!maybe));
  }

  getCategories(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.baseUrl).pipe(share(), tap(c => this.allUsers$.next(c)));
  }

  update(id: number, data: UserDetails): Observable<UserDetails> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<UserDetails>(url, data);
  }

  create(data: UserDetails): Observable<UserDetails> {
    return this.http.post(this.baseUrl, data).pipe(map(() => {
      let allUsers = this.allUsers$.value || [];
      let nprods = allUsers.length;
      let foundit = false;
      for (let i = 0; i < nprods; ++i) {
        if (allUsers[i].id === data.id) {
          allUsers.splice(i, 1, data);
          foundit = true;
          break;
        }
      }
      if (!foundit) {
        allUsers.push(data);
      }
      this.allUsers$.next(allUsers);
      return data;
    }));
  }

  login(data: any): Observable<SessionDetails>{
    return this.http.post<SessionDetails>('http://localhost/inventory-app/api/web/auth/login', data);
  }

}
