import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import {RouterModule, Routes} from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainmenu', pathMatch: 'full' },
  { path: 'mainmenu', component: MainmenuComponent},
  { path: 'basket', component: BasketComponent},
  { path: 'item/:id', component: ItemComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    BasketComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
