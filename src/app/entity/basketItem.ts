import {Item} from './item';

export class BasketItem {
  item: Item;
  count: number;

  compareByItem(item: Item): boolean {
    return this.item.id === item.id && this.item.price === item.price && this.item.weight === item.weight && this.item.name === item.name;
  }

  constructor(item: Item) {
    this.item = item;
    this.count = 1;
  }
}
