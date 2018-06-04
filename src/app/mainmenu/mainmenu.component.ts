import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../services/items.service';
import {Item} from '../entity/item';
import {MenuService} from '../services/menu.service';
import {BasketService} from '../services/basket.service';
import {Router} from '@angular/router';
import {BasketItem} from '../entity/basketItem';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  private _clickFlag = true;
  private _firstSidebarAppear = true;

  basketItems: BasketItem[];

  get items(): Item[] {
    return this.itemsService.items;
  }

  set clickFlag(value: boolean) {
    this._clickFlag = value;
  }

  get clickFlag(): boolean {
    return this._clickFlag;
  }

  get sidebarFlag(): boolean {
    if (this.menuService.sidebarFlag) {
      this._firstSidebarAppear = false;

      return true;
    } else { return false; }
  }

  get firstSidebarAppear(): boolean {
    return this._firstSidebarAppear;
  }

  getBasketInfo(): string {
    if (this.basketItems.length === 0) { return 'Корзина'; } else { return `Корзина:${this.basketItems.length}`; }
  }

  itemClick(id: number) {
    if (this._clickFlag) {
      this.menuService.item = this.items[id - 1];
      this.router.navigateByUrl(`/item/${id}`);
    }
  }

  addToBasket(id: number) {
    this.basketService.add(this.items[id - 1]);

    // this.items.forEach((item => this.basketService.add(item)));
  }

  removeFromBasket(id: number) {
    this.basketService.remove(id);
  }

  constructor(private itemsService: ItemsService, private menuService: MenuService, private basketService: BasketService,
              private router: Router) {
    this.menuService.menuItemId = 1;
  }

  ngOnInit() {
    this.basketItems = this.basketService.items;
  }
}
