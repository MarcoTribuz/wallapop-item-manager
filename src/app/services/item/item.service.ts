import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Items} from "../../interfaces/items";

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

  getItems(): Observable<Items> {
    return this.http.get<Items>(this.itemsUrl).pipe(
      catchError(this.handleError<Items>('getItems', {items: []}))
    )
  }

  setFavorite(id: Number){

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
