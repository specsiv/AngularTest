import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Item } from '../entity/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsUrl = 'http://localhost:8080/api/items';

  items: Item[] = new Array<Item>();

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  getItems() {
    this.http.get<Item[]>(this.itemsUrl + '/getAll').pipe(
      catchError(this.handleError('getItems', []))
    ).subscribe(items => this.items = items);
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(this.itemsUrl + `/get/${id}`).pipe(
      catchError(this.handleError('getItemById'))
    );
  }

  constructor(private http: HttpClient) { }
}
