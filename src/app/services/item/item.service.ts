import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Items} from "../../interfaces/items";
import {Item} from "../../interfaces/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  subject = new BehaviorSubject([]);

  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Items>(this.itemsUrl).pipe(
      map((i: Items) => {
        return i.items.map((i, index) => {
          return {...i, id: index, favorite: false}
        })
      }),
      catchError(this.handleError<Item[]>('getItems', []))
    )
  }

  switchFavorite(id: Number): void{
    console.log("ca")
  }

  unsetFavorite(id: Number): void {

  }

  searchItem(value: string): Observable<[]> {
    console.log("Service", value)
    if (!value.trim()) return of([])
    return of([])
  }

  private log(message: string) {
    console.log("Message", message)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
