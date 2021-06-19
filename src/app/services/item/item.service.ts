import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {IItems} from "../../interfaces/IItems";
import {IItem} from "../../interfaces/IItem";

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private _itemsList: BehaviorSubject<any> = new BehaviorSubject([]);
  private _itemsListFiltered: BehaviorSubject<any> = new BehaviorSubject([]);
  public itemsList$ = this._itemsList.asObservable()

  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  constructor(private http: HttpClient) {
  }

  switchFavorite(item: IItem): void{
    item.favorite = !item.favorite
  }

  searchItem(value: string): void {
    const itemsList = this._itemsListFiltered.getValue()
    const filtered = itemsList.filter((it: IItem) => it.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    this._itemsList.next(filtered)
  }

  fetchItems(): void {
    this.http.get<IItems>(this.itemsUrl).pipe(
      map((i: IItems) => {
        return i.items.map((i, index) => {
          return {...i, favorite: false}
        })
      }),
      tap((i: IItem[]) => {
        this._itemsList.next(i)
        this._itemsListFiltered.next(i)
      }),
    ).subscribe()
  }
}
