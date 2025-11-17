import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = []
  // Remember constructors == dependency injection
  constructor(private productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar
  
  ){

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      // Mapping the data that we have fetched from response to products list
      this.products = data;
    })
  }

  // next is a way to say what should happen after this request is successful
  addToCart(product: Product) : void{
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Added to cart")
      }
    })
  }


}
