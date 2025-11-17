import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  products: Product[] = []
  filteredProducts: Product[] = []
  sortOrder: string = ""


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
      this.filteredProducts = data;
    })
  }

  // next is a way to say what should happen after this request is successful
  addToCart(product: Product) : void{
    this.cartService.addToCart(product).subscribe({
      next: () => {
        // Empty space for placeholder for action ie. undo
        this.snackBar.open("Product added to cart!", "", {
          // Creating new object for configuration
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      }
    })
  }

  applyFilter(event: Event) : void{
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase()

    this.filteredProducts = this.products.filter(
        product => product.name.toLowerCase().includes(searchTerm)
    )

    this.sortProducts(this.sortOrder)
  }


  sortProducts(sortValue: string){
    this.sortOrder = sortValue;

    if(this.sortOrder === "priceLowHigh"){
      this.filteredProducts.sort( (a,b) => a.price - b.price)
      
    }else if (this.sortOrder === "priceHighLow"){
      this.filteredProducts.sort( (a,b) => b.price - a.price)

    }
  }

}
