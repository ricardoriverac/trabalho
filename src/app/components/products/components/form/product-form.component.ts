import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa os módulos necessários
})
export class ProductFormComponent {
  @Input() editingProduct: Product | null = null;
  @Input() isSaving = false;
  @Output() saveProduct = new EventEmitter<Product>();
  @Output() cancelEdit = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges(): void {
    if (this.editingProduct) {
      this.productForm.setValue({
        title: this.editingProduct.title,
        description: this.editingProduct.description,
        price: this.editingProduct.price,
      });
    }
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const product = { ...this.editingProduct, ...this.productForm.value };
      this.saveProduct.emit(product);
      this.productForm.reset();
    }
  }
}
