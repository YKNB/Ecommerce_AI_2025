import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div *ngIf="product" class="detail">
    <img [src]="product.image" alt=""/>
    <h2>{{product.name}}</h2>
    <p class="price">$ {{product.price}}</p>
    <p>{{product.description}}</p>
    <button (click)="add(product)">Add to cart</button>
  </div>
  `,
  styles: [`.detail img{max-width:320px;width:100%;border-radius:6px}`]
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ps = inject(ProductService);
  private cs = inject(CartService);
  product?: Product;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.ps.get(id).subscribe(p => this.product = p);
    }
  }

  add(p: Product) { this.cs.add(p, 1); }
}
