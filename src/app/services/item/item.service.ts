import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Items} from "../../interfaces/items";
import {Item} from "../../interfaces/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Items>(this.itemsUrl).pipe(
      map((i: Items) => {
        console.log(i.items)
        return i.items.map((i, index) => {
          return Object.assign({favorite: false}, i)
        })
      }),
      catchError(this.handleError<Item[]>('getItems', []))
    )
  }

  setFavorite(id: Number): void{

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
