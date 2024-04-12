import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() data!: Product;
  @Output() item = new EventEmitter();
  addedButton: boolean = false;
  amount: number = 1;

  constructor() {}

  ngOnInit(): void {}

  add() {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
}
