import {ProdusDisponibil} from "../pseudo-api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productSubject = new BehaviorSubject<ProdusDisponibil[]>([]);
  products$ = this.productSubject.asObservable()

  setProducts(products: ProdusDisponibil[]) {
    this.productSubject.next(products)
  }
}
