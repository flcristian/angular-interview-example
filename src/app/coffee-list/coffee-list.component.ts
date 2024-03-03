import {Component, Input, OnInit} from '@angular/core';
import {ProdusDisponibil} from "../pseudo-api.service";
import {Subscription, timeout} from "rxjs";
import {ProductStateService} from "../service/product-state.service";

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html'
})
export class CoffeeListComponent implements OnInit {
  private subscriptions = new Subscription()
  @Input() cafeId: number = -1;
  products: ProdusDisponibil[] = []
  filteredProducts: ProdusDisponibil[] = []
  filterText: string = ""
  timeout: any;

  constructor(
    private state: ProductStateService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.state.products$.subscribe(data => {
        this.filterText = ""
        this.filteredProducts = data
        this.products = data
      })
    )
  }

  filterProducts(){
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      let criterias = this.filterText.split(" ")

      if(this.filterText.trim() == "") {
        this.filteredProducts = this.products
        return;
      }
      this.filteredProducts = []
      this.products.forEach(product => {
        let matching = 0;
        for (let i = 0; i < criterias.length; i++) {
          let c = criterias[i]
          if (parseInt(c)) {
            if (product.id === parseInt(c)) {
              matching++
            } else {
              return;
            }
          } else if (product.denumire.toLocaleLowerCase().includes(c.toLocaleLowerCase()) || product.descriere.toLocaleLowerCase().includes(c.toLocaleLowerCase())) matching++
        }

        if (matching == criterias.length) this.filteredProducts.push(product)
      })
    }, 250)
  }
}
