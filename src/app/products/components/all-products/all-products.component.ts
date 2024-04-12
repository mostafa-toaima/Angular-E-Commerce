import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  constructor(private services: ProductsService) {}
  products: Product[] = [];
  Categories: string[] = [];
  CartProducts: any[] = [];
  loading: boolean = false;
  productsArray = Object.entries(this.products);

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.services.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false;
        console.log(this.products);
      },
      (error: any) => {
        alert(error);
        this.loading = false;
      }
    );
  }
  getCategories() {
    this.loading = true;
    this.services.getAllCategories().subscribe(
      (res: any) => {
        this.Categories = res;
        this.loading = false;
      },
      (error) => {
        alert(error);
        this.loading = false;
      }
    );
  }

  filterProduct(event: any) {
    let value = event.target.value;
    value == 'all' ? this.getProducts() : this.getProByCat(value);
  }

  getProByCat(keyword: string) {
    this.loading = true;
    this.services.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    });
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.CartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.CartProducts.find(
        (item) => item.item.id == event.item.id
      );
      if (exist) {
        alert('Product is exist');
      } else {
        this.CartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.CartProducts));
      }
    } else {
      this.CartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.CartProducts));
    }
  }
}
