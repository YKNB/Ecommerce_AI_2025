import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: '/products', pathMatch: 'full' },
	{
		path: 'products',
		loadComponent: () => import('./components/products.component').then(m => m.ProductsComponent)
	},
	{
		path: 'product/:id',
		loadComponent: () => import('./components/product-detail.component').then(m => m.ProductDetailComponent)
	},
	{
		path: 'cart',
		loadComponent: () => import('./components/cart.component').then(m => m.CartComponent)
	}
];
