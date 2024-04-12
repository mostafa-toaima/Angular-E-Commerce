import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get('https://api.escuelajs.co/api/v1/products');
  }

  getAllCategories() {
    return this.http.get('https://api.escuelajs.co/api/v1/categories');
  }

  getProductsByCategory(id: any) {
    return this.http.get(
      ' https://api.escuelajs.co/api/v1/products/?categoryId=' + id
    );
  }

  getProductById(id: any) {
    return this.http.get('https://api.escuelajs.co/api/v1/products/' + id);
  }
}
