import { Injectable, signal } from '@angular/core';

interface ToastItem { id: number; message: string }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = signal<ToastItem[]>([]);
  readonly toasts = this._toasts;
  private idCounter = 1;

  show(message: string, ms = 4000) {
    const id = this.idCounter++;
    const item = { id, message };
    this._toasts.set([...this._toasts(), item]);
    setTimeout(() => this.remove(id), ms);
  }

  remove(id: number) {
    this._toasts.set(this._toasts().filter(t => t.id !== id));
  }
}
