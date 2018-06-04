import { Injectable } from '@angular/core';
import {BasketItem} from '../entity/basketItem';
import {Item} from '../entity/item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  items = new Array<BasketItem>();

  indexOfItem(item: Item): number {
    let i = 0;
    while (i < this.items.length && !this.items[i].compareByItem(item)) { ++i; }
    if (i === this.items.length) { return -1; } else { return i; }
  }

  add(item: Item) {
    const index = this.indexOfItem(item);

    if (index === -1) {
      this.items.push(new BasketItem(item));
    } else {
      ++this.items[index].count;
    }
  }

  remove(id: number) {
    if (this.items[id - 1].count === 1) {
      this.items.splice(id - 1, 1);
    } else {
      --this.items[id - 1].count;
    }
  }

  getItemsCount(): number {
    return this.items.length;
  }

  getItemCount(index: number): number {
    return this.items[index].count;
  }

  constructor() { }
}
