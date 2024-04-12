import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private services: CartsService) {}
  CartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts() {
    if ('cart' in localStorage) {
      this.CartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getTotalPrice();
  }

  addAmount(i: number) {
    this.CartProducts[i].quantity++;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.CartProducts));
  }

  minsAmount(i: number) {
    this.CartProducts[i].quantity--;
    if (this.CartProducts[i].quantity <= 0) {
      this.CartProducts[i].quantity = 1;
    }
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.CartProducts));
  }

  detectChange() {
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.CartProducts));
  }

  deleteProduct(i: number) {
    this.CartProducts.splice(i, 1);
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.CartProducts));
    if (this.CartProducts.length == 0) {
      this.total = 0;
    }
  }

  clearCarts() {
    this.CartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.CartProducts));
    this.total = 0;
  }

  getTotalPrice() {
    this.total = 0;
    for (let x in this.CartProducts) {
      this.total +=
        this.CartProducts[x].item.price * this.CartProducts[x].quantity;
    }
    this.total = Math.round(this.total);
  }

  addCart() {
    let products = this.CartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this.services.createNewCart(model).subscribe((res) => {
      this.success = true;
      this.CartProducts = [];
      localStorage.setItem('cart', JSON.stringify(this.CartProducts));
      this.total = 0;
    });
    console.log(model);
  }
}
