import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, share, tap } from 'rxjs';
import { ProductDetails } from './product-details';

@Injectable({
  providedIn: 'root'
})

export class ProductsServices {
  readonly baseUrl = 'http://localhost/inventory-app/api/web/products';
  private allProducts$ = new BehaviorSubject<ProductDetails[]>([]);

  constructor(private http: HttpClient) { }

  watchAllCategories(): Observable<ProductDetails[]> {
    return this.allProducts$.pipe(filter(maybe => !!maybe));
  }

  getCategories(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${this.baseUrl}?expand=category,subcategory`).pipe(share(), tap(c => this.allProducts$.next(c)));
  }

  update(id: number, data: ProductDetails): Observable<ProductDetails> {
    const url = `${this.baseUrl}/${id}?expand=category,subcategory`;
    return this.http.put<ProductDetails>(url, data);
  }

  create(rawData: ProductDetails): Observable<ProductDetails> {
    let { category, subcategory, ...info } = rawData;
    const data = rawData;

    return this.http.post(this.baseUrl, info).pipe(map(() => {
      let allProducts = this.allProducts$.value || [];
      let nprods = allProducts.length;
      let foundit = false;
      for (let i = 0; i < nprods; ++i) {
        if (allProducts[i].id === data.id) {
          allProducts.splice(i, 1, data);
          foundit = true;
          break;
        }
      }
      if (!foundit) {
        allProducts.push(data);
      }
      this.allProducts$.next(allProducts);
      return data;
    }));
  }
}
