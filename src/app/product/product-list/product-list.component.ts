import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products: Product[] = []
  // Remember constructors == dependency injection
  constructor(private productService: ProductService){

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      // Mapping the data that we have fetched from response to products list
      this.products = data;
    })
  }


}
