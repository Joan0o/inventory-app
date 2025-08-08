import { CategoryDetails } from '../categories/category-details';
import { inject, Injectable } from '@angular/core';
import { SubcategoryDetails } from './subcategory';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SubcategoriesService {
  readonly baseUrl = 'http://localhost/inventory-app/api/web/subcategories';
  private allSubcategories$ = new BehaviorSubject<SubcategoryDetails[]>([]);

  constructor(private http: HttpClient) { }

  watchAllCategories(): Observable<SubcategoryDetails[]> {
    return this.allSubcategories$.pipe(filter(maybe => !!maybe));
  }

  getCategories(): Observable<SubcategoryDetails[]> {
    return this.http.get<SubcategoryDetails[]>(`${this.baseUrl}?expand=category`).pipe(share(), tap(c => this.allSubcategories$.next(c)));
  }

  update(id: number, data: SubcategoryDetails): Observable<SubcategoryDetails> {
    const url = `${this.baseUrl}/${id}?expand=category`;
    return this.http.put<SubcategoryDetails>(url, data);
  }

  create(rawData: SubcategoryDetails): Observable<SubcategoryDetails> {
    let { category, ...info } = rawData;
    const data = rawData;

    return this.http.post(this.baseUrl, info).pipe(map(() => {
      let allSubcategories = this.allSubcategories$.value || [];
      let nprods = allSubcategories.length;
      let foundit = false;
      for (let i = 0; i < nprods; ++i) {
        if (allSubcategories[i].id === data.id) {
          allSubcategories.splice(i, 1, data);
          foundit = true;
          break;
        }
      }
      if (!foundit) {
        allSubcategories.push(data);
      }
      this.allSubcategories$.next(allSubcategories);
      return data;
    }));
  }

  getCategory(id: number){
    return this.http.get<CategoryDetails>(`${this.baseUrl}/${id}/?expand=category`);
  }
}
