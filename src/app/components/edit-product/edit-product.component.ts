import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  updateProductRequest: Product = {
    id: '',
    name: '',
    type: '',
    price: 0
  };
  constructor(private productsService: ProductsService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get("id");
        if (id) {
          this.productsService.getProduct(id)
            .subscribe({
              next: (response) => {
                this.updateProductRequest = response;
              }
            })

        }
      }
    })
  }
  updateProduct() {
    this.productsService.updateProduct(this.updateProductRequest.id, this.updateProductRequest)
      .subscribe({
        next: (product) => {
          this.router.navigate(['products'])
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
