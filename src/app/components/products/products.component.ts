import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/form/product-form.component';
import { ProductListComponent } from './components/list/product-list.component';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductFormComponent, ProductListComponent],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.products;
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'Erro ao carregar produtos. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    );
  }

  addProduct(product: Product): void {
    this.isSaving = true;
    const newProduct = { ...product, id: this.generateNewId() };
    this.products = [newProduct, ...this.products];
    this.isSaving = false;
  }

  updateProduct(product: Product): void {
    this.isSaving = true;
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index > -1) {
      this.products[index] = product;
    }
    this.editingProduct = null;
    this.isSaving = false;
  }

  deleteProduct(id: number): void {
    this.isSaving = true;
    this.products = this.products.filter((product) => product.id !== id);
    this.isSaving = false;
  }

  private generateNewId(): number {
    return this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
  }

  setEditingProduct(product: Product): void {
    this.editingProduct = product;
  }
}
