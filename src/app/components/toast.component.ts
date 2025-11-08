import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrapper" aria-live="polite">
      <div *ngFor="let t of toastSvc.toasts()" class="toast">
        {{ t.message }}
        <button (click)="toastSvc.remove(t.id)" aria-label="close">✕</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-wrapper{position:fixed;top:16px;right:16px;display:flex;flex-direction:column;gap:8px;z-index:9999}
    .toast{background:#333;color:#fff;padding:8px 12px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.2);display:flex;align-items:center;gap:8px}
    .toast button{background:transparent;border:0;color:#fff;cursor:pointer;font-size:12px}
  `]
})
export class ToastComponent {
  constructor(public toastSvc: ToastService) {}
}
