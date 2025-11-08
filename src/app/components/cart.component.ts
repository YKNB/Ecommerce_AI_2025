import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="cart">
    <h3>Cart</h3>
    <ul>
      <li *ngFor="let it of items">
  {{ it.product.name }} × {{ it.qty }} — $ {{ (it.product.price * it.qty) | number:'1.2-2' }}
        <button (click)="remove(it.product.id)">Remove</button>
      </li>
    </ul>
    <div *ngIf="items.length === 0">Cart is empty</div>
  <div class="total">Total: $ {{ total | number:'1.2-2' }}</div>
    <button (click)="clear()" [disabled]="items.length === 0">Clear</button>
  </div>
  `
})
export class CartComponent {
  private cs = inject(CartService);
  get items() { return this.cs.items(); }
  get total() { return this.cs.total(); }
  remove(id: number) { this.cs.remove(id); }
  clear() { this.cs.clear(); }
}
