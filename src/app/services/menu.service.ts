import { Injectable } from '@angular/core';
import { Item } from '../entity/item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _menuItemId = 0;
  private _item: Item;
  private _sidebarFlag = false;

  set menuItemId(id: number) {
    this._menuItemId = id;
  }

  get menuItemId() {
    return this._menuItemId;
  }

  set item(item: Item) {
    this._item = item;
  }

  get item() {
    return this._item;
  }

  set sidebarFlag(value: boolean) {
    this._sidebarFlag = value;
  }

  get sidebarFlag() {
    return this._sidebarFlag;
  }

  constructor() { }
}
