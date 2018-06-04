import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import {BasketService} from '../services/basket.service';
import {BasketItem} from '../entity/basketItem';
import {Item} from '../entity/item';
import {ItemsService} from '../services/items.service';
import {OrderService} from '../services/order.service';
import {Customer} from '../entity/customer';
import {error} from 'util';


enum Direction {
  left,
  right
}

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  private advEmpty = new Item();
  private advItemIndex = -1;
  private advItemFlag = true;

  fio = '';
  items: BasketItem[];

  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  get advItem(): Item {
    if (this.itemsService.items.length === 0) {
      return this.advEmpty;
    } else {
      if (this.advItemFlag) {
        this.advItemFlag = false;
        this.advItemIndex = this.randomInt(0, this.itemsService.items.length - 1);
      }

      return this.itemsService.items[this.advItemIndex];
    }
  }

  makeOrder() {
    let customerId;

    this.orderService.getCustomerByName(this.fio).subscribe(result => {
      if ('error' in result) {
        this.orderService.addCustomer(this.fio).subscribe(newCustomer => {
          if ('error' in newCustomer) {
            this.fio = 'error2';
          } else { customerId = newCustomer.id; }
        });
      } else {
        customerId = result.id;
      }


      this.orderService.addOrder(customerId).subscribe(order => {
        if ('error' in order) {
          this.fio = 'error3';
        } else {
          this.orderService.addBasket(this.items, order.id);
        }
      });
    });
  }

  addToBasket(item: BasketItem, id: number) {
    this.basketService.add(item.item);
  }

  removeFromBasket(id: number) {
    this.basketService.remove(id);
  }

  changeAdvItem(direction: Direction) {

    if (direction === Direction.left) {
      if (this.advItemIndex === 0) { this.advItemIndex = this.itemsService.items.length - 1; } else { --this.advItemIndex; }
    } else {
      if (this.advItemIndex === this.itemsService.items.length - 1) { this.advItemIndex = 0; } else { ++this.advItemIndex; }
    }
  }

  constructor(private menuService: MenuService, private basketService: BasketService, private itemsService: ItemsService,
              private orderService: OrderService) {
    this.menuService.menuItemId = 2;
  }

  ngOnInit() {
    this.items = this.basketService.items;

    this.advEmpty.id = -1;
    this.advEmpty.name = '';
    this.advEmpty.price = 0;
    this.advEmpty.weight = 0;
  }
}
