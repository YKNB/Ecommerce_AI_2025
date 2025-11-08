import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CartService } from './services/cart.service';
import { ToastComponent } from './components/toast.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ecommerce-app');
  private cs = inject(CartService);
  readonly cartCount = computed(() => this.cs.items().length);
}
