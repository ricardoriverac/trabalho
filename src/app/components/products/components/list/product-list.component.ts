import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule], // Importa o CommonModule para usar *ngFor
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() isSaving = false;
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number>();
}
