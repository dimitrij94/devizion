import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../entities/product/product.service";
import {Product} from "../../entities/product/product.model";

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styles: []
})
export class PortfolioComponent implements OnInit {
    private products:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
      this.productService.query().subscribe((res)=>this.products = res.json());
  }


}
