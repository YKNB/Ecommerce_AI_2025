import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="products-root">
    <div *ngIf="loading" class="spinner" aria-hidden="true">
      <div class="spinner-dot"></div>
    </div>
    <div *ngIf="error" class="error">{{ error }}</div>

    <div class="products-grid" *ngIf="!loading && products.length > 0">
      <div class="product" *ngFor="let p of products">
        <img [src]="p.image" alt=""/>
        <h3>{{p.name}}</h3>
        <div class="price">$ {{p.price}}</div>
        <p class="desc">{{p.description}}</p>
        <div class="actions">
          <button (click)="add(p)">Add to cart</button>
          <a [routerLink]="['/product', p.id]">Details</a>
        </div>
      </div>
    </div>

    <div *ngIf="!loading && products.length === 0 && !error">Aucun produit disponible.</div>
  </div>
  `,
  styles: [`.products-root .spinner{display:flex;align-items:center;justify-content:center;padding:12px;margin-bottom:12px}.spinner-dot{width:40px;height:40px;border-radius:50%;border:4px solid rgba(0,0,0,0.08);border-top-color:#2c3e50;animation:spin 1s linear infinite}.products-root .error{color:#8b0000;margin-bottom:12px}.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}.product{background:#fff;padding:12px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,.08);display:flex;flex-direction:column}.product img{width:100%;height:140px;object-fit:cover;border-radius:4px}.actions{display:flex;gap:8px;margin-top:8px}@keyframes spin{to{transform:rotate(360deg)}}`]
})
export class ProductsComponent implements OnInit {
  private ps = inject(ProductService);
  private cs = inject(CartService);
  products: Product[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loading = true;
    this.ps.list().subscribe({
      next: (p) => {
        this.products = p || [];
        this.loading = false;
        if (this.ps.hadError()) {
          this.error = 'Impossible de joindre l\'API distante — affichage des produits en cache.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors du chargement des produits.';
        this.products = [];
      }
    });
  }

  add(p: Product) { this.cs.add(p, 1); }
}

