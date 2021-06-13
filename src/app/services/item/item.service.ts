import { Injectable } from '@angular/core';
import {Item} from "../../interfaces/item";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap((i) => console.log(i)),
      catchError(this.handleError<Item[]>('getItems', []))
  )
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
