import {Component, OnDestroy, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {ProdusDisponibil, PseudoApiService} from "../pseudo-api.service";
import {CafeneaSauLocalitate} from "../cafeneasaulocalitate";
import {Subscription} from "rxjs";
import {Chain} from "@angular/compiler";
import {ProductStateService} from "../service/product-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  cafe: CafeneaSauLocalitate | null = null;
  nodes: TreeNode<CafeneaSauLocalitate>[] = [];

  constructor(
    private service: PseudoApiService,
    private state: ProductStateService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.service.ListaLocalitati().subscribe({
        next: (places) => {

          let childNodes: TreeNode<CafeneaSauLocalitate>[] = this.findChildrenNodes(places)

          places.forEach(p => {
            if(p.idParinte == null) {
              this.nodes.push({
                label: p.denumire,
                data: p,
                children: this.findCorespondingChildren(childNodes, p.id)
              })
            }
          })
        }
      })
    )
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

  findChildrenNodes(places: CafeneaSauLocalitate[]): TreeNode<CafeneaSauLocalitate>[] {
    let children: TreeNode<CafeneaSauLocalitate>[] = [];

    places.forEach(p => {
      if(p.idParinte != null) {
        if(p.fel == 'L') {
          children.push({
            label: p.denumire,
            data: p,
            children: []
          })
        }
        else {
          children[children.findIndex(node => node.data?.id == p.idParinte)]
            .children?.push({
            label: p.denumire,
            data: p,
            children: []
          })
        }
      }
    })

    return children;
  }

  findCorespondingChildren(childNodes: TreeNode<CafeneaSauLocalitate>[], id: number): TreeNode<CafeneaSauLocalitate>[] {
    let children: TreeNode<CafeneaSauLocalitate>[] = [];

    childNodes.forEach(node => {
      if (node.data?.idParinte === id) {
        children.push(node);
      }
    });

    return children;
  }

  selectCafe(event: any) {
    if(event.node.data.fel == "C") {
      this.cafe = event.node.data;

      this.service.ProduseDisponibile(this.cafe!.id).subscribe(products => {
        this.state.setProducts(products)
      })
    }
  }
}

