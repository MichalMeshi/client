import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct: Product = {
    id: '',
    name: '',
    type: '',
    price: 0
  }
  constructor(private productsService: ProductsService, private router: Router) { }
  addProduct() {
    this.productsService.addProduct(this.newProduct)
      .subscribe({
        next: (product) => {
          this.router.navigate(['products']);
        },
        error: (response) => {
          console.log(response);
        }
      })
  }
}
