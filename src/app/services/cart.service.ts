import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem { product: Product; qty: number }

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);
  readonly items = this._items;
  total = computed(() => this._items().reduce((s, it) => s + it.product.price * it.qty, 0));
  private readonly storageKey = 'cart_v1';

  constructor() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        this._items.set(parsed);
      }
    } catch {
      // ignore
    }
  }

  add(product: Product, qty = 1) {
    const items = this._items();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx >= 0) {
      items[idx] = { product, qty: items[idx].qty + qty };
    } else {
      items.push({ product, qty });
    }
    this._items.set([...items]);
    this.save();
  }

  remove(productId: number) {
    this._items.set(this._items().filter(i => i.product.id !== productId));
    this.save();
  }

  clear() { this._items.set([]); this.save(); }

  private save() {
    try { localStorage.setItem(this.storageKey, JSON.stringify(this._items())); } catch {}
  }
}
