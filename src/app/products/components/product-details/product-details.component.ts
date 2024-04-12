import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProById();
  }

  getProById() {
    this.loading = true;
    this.service.getProductById(this.id).subscribe(
      (res) => {
        this.data = res;
        this.loading = false;
      },
      (error) => {
        alert(error.message);
        this.loading = false;
      }
    );
  }
}
