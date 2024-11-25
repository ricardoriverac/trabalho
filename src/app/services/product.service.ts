import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products'; // Endpoint da API

  constructor(private http: HttpClient) {}

  // Listar produtos
  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.apiUrl);
  }

  // Criar produto
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Atualizar produto
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Deletar produto
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
