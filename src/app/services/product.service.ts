import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiBase = '/api';
  private _lastError = false;
  private readonly cacheKey = 'products_cache_v1';
  private toast = inject(ToastService);

  // fallback local products if API not present
  private _fallback: Product[] = [
    { id: 1, name: 'Classic T-Shirt', price: 19.99, image: 'https://picsum.photos/seed/ts1/400/300', description: 'Comfortable cotton t-shirt' },
    { id: 2, name: 'Sneakers', price: 69.95, image: 'https://picsum.photos/seed/sn1/400/300', description: 'Stylish everyday sneakers' },
    { id: 3, name: 'Denim Jacket', price: 89.5, image: 'https://picsum.photos/seed/dj1/400/300', description: 'Warm denim jacket' }
  ];

  hadError() { return this._lastError; }

  list(): Observable<Product[]> {
    // return cached if present
    try {
      const cached = sessionStorage.getItem(this.cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as Product[];
        return of(parsed);
      }
    } catch {
      // ignore cache parse errors
    }

    this._lastError = false;
    return this.http.get<Product[]>(`${this.apiBase}/products`)
      .pipe(
        tap((res) => {
          try { sessionStorage.setItem(this.cacheKey, JSON.stringify(res)); } catch {}
        }),
        catchError(() => {
          this._lastError = true;
          // show toast and return fallback
          try { this.toast.show('Impossible de joindre l\'API distante — affichage des produits en cache.'); } catch {}
          return of(this._fallback);
        })
      );
  }

  get(id: number): Observable<Product | undefined> {
    this._lastError = false;
    return this.http.get<Product>(`${this.apiBase}/product/${id}`)
      .pipe(
        catchError(() => {
          this._lastError = true;
          try { this.toast.show('Erreur lors de la récupération du produit — affichage du produit local si disponible.'); } catch {}
          const p = this._fallback.find(x => x.id === id);
          return of(p);
        })
      );
  }
}
