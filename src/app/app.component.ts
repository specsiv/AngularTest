import { Component } from '@angular/core';
import {MenuService} from './services/menu.service';
import {BasketService} from './services/basket.service';
import {ItemsService} from './services/items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _sidebarFlag = false;

  set sidebarFlag(value: boolean) {
    this._sidebarFlag = value;
    this.menuService.sidebarFlag = value;
  }

  get sidebarFlag() {
    return this._sidebarFlag;
  }

  set menuItemId(id: number) {
    this.menuService.menuItemId = id;
  }

  get menuItemId() {
    return this.menuService.menuItemId;
  }

  constructor (private menuService: MenuService, private basketService: BasketService, private itemsService: ItemsService) {
    this.itemsService.getItems();
  }
}
