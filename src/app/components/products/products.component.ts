import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private productsService: ProductsService, private router: Router) { }
  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (response) => {
          console.log(response);
        }
      });
  }
  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
      .subscribe({
        next: (res) => {
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentUrl]);
            })

        }
      })

  }

}
