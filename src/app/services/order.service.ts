import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Customer} from '../entity/customer';
import {Order} from '../entity/order';
import {Basket} from '../entity/basket';
import {BasketItem} from '../entity/basketItem';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private customerUrl = 'http://localhost:8080/api/customer';
  private orderUrl = 'http://localhost:8080/api/orders';
  private basketUrl = 'http://localhost:8080/api/basket';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  checkCustomerByName(fio: string): Observable<boolean> {
    return this.http.get<boolean>(this.customerUrl + `/checkByName/${fio}`).pipe(
      catchError(this.handleError('checkByName', null))
    );
  }

  getCustomerByName(fio: string): Observable<Customer> {
    return this.http.get<Customer>(this.customerUrl + `/getByName/${fio}`).pipe(
      catchError(this.handleError('getCustomerByName', null))
    );
  }

  addCustomer(fio: string): Observable<Customer> {
    const newCustomer = new Customer();
    newCustomer.fio = fio;
    newCustomer.vipStatus = false;

    return this.http.post<Customer>(this.customerUrl + '/add', newCustomer, httpOptions).pipe(
      catchError(this.handleError('addCustomer'))
    );
  }

  addOrder(customerId: number): Observable<Order> {
    const newOrder = new Order();
    newOrder.date = new Date();
    newOrder.customerId = customerId;

    return this.http.post<Order>(this.orderUrl + '/add', newOrder, httpOptions).pipe(
      catchError(this.handleError('addOrder'))
    );
  }

  addBasket(basketItems: BasketItem[], orderId: number) {
    const basketList = new Array<Basket>();

    basketItems.forEach(item => {
      for (let i = 0; i < item.count; ++i) {
        const newBasket = new Basket();
        newBasket.itemId = item.item.id;
        newBasket.orderId = orderId;

        basketList.push(newBasket);
      }
    });

    this.http.post(this.basketUrl + '/addList', basketList, httpOptions).pipe(
      catchError(this.handleError('addBasket'))
    ).subscribe();
  }

  constructor(private http: HttpClient) { }
}
