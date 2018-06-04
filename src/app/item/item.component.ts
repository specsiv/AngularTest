import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import {Item} from '../entity/item';
import { ActivatedRoute } from '@angular/router';
import {ItemsService} from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Item;

  constructor(private menuService: MenuService, private itemsService: ItemsService, private route: ActivatedRoute) {
    menuService.menuItemId = 0;
    const item = menuService.item;

    if (item != null) {
      this.item = item;
    } else {
      itemsService.getItemById(this.route.snapshot.paramMap.get('id')).subscribe(itemFromDb => this.item = itemFromDb);
    }
  }

  ngOnInit() {
  }

}
