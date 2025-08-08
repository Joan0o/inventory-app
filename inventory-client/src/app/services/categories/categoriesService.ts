import { inject, Injectable } from '@angular/core';
import { CategoryDetails } from './category-details';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  readonly baseUrl = 'http://localhost/inventory-app/api/web/categories';
  private allCategories$ = new BehaviorSubject<CategoryDetails[]>([]);

  constructor(private http: HttpClient) { }

  watchAllCategories(): Observable<CategoryDetails[]> {
    return this.allCategories$.pipe(filter(maybe => !!maybe));
  }

  getCategories(): Observable<CategoryDetails[]> {
    return this.http.get<CategoryDetails[]>(this.baseUrl).pipe(share(), tap(c => this.allCategories$.next(c)));
  }

  update(id: number, data: CategoryDetails): Observable<CategoryDetails> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<CategoryDetails>(url, data);
  }

  create(data: CategoryDetails): Observable<CategoryDetails> {

    return this.http.post(this.baseUrl, data).pipe(map(() => {
      let allCategories = this.allCategories$.value || [];
      let nprods = allCategories.length;
      let foundit = false;
      for (let i = 0; i < nprods; ++i) {
        if (allCategories[i].id === data.id) {
          allCategories.splice(i, 1, data);
          foundit = true;
          break;
        }
      }
      if (!foundit) {
        allCategories.push(data);
      }
      this.allCategories$.next(allCategories);
      return data;
    }));
  }

}
