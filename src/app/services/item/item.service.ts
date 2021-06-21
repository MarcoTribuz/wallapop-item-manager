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
  private _favoriteItemsList: BehaviorSubject<any> = new BehaviorSubject([]);
  private _defaultItemsList: BehaviorSubject<any> = new BehaviorSubject([]);
  private itemPerPage: number = 5
  private actualPageDashboard: number = 1
  private actualPageFavorite: number = 1
  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';
  private isFavoriteModal: boolean = false
  private searchedValueDashboard: string = ''
  private searchedValueFavorite: string = ''

  public itemsList$ = this._itemsList.asObservable()
  public favoriteItemsList$ = this._favoriteItemsList.asObservable()
  public defaultItemsList$ = this._defaultItemsList.asObservable()

  constructor(private http: HttpClient) {
  }

  switchFavorite(item: IItem, isFavorite: boolean = false): void{
    item.favorite = !item.favorite
    const actualResearch = this.getSearchedValue(isFavorite)
    this.searchItem(actualResearch, isFavorite)
  }

  searchItem(value: string, isFavorite: boolean = false): void {
    this.setSearchedValue(value, isFavorite)
    const itemsList = this._defaultItemsList.getValue()
    const actualResearch = this.getSearchedValue(isFavorite)
    const filtered = itemsList.filter((it: IItem) => it.title.toLocaleLowerCase().includes(actualResearch.toLocaleLowerCase()))
    const slicedList = filtered.slice(0, this.itemPerPage)
    this.updateBehaviourSubjects(slicedList, isFavorite)
  }

  updateBehaviourSubjects(itemsArray: IItem[], isFavorite: boolean = false) {
    isFavorite ? this._favoriteItemsList.next(itemsArray) : this._itemsList.next(itemsArray)
    this._defaultItemsList.next(this._defaultItemsList.getValue())
  }

  fetchItems(): void {
    const itemsList = this._defaultItemsList.getValue()
    if (itemsList.length > 0) return
    this.http.get<IItems>(this.itemsUrl).pipe(
      map((i: IItems) => {
        return i.items.map((i, index) => {
          return {...i, favorite: false}
        })
      }),
      tap((i: IItem[]) => {
        this._itemsList.next(i.slice(0, this.itemPerPage))
        this._favoriteItemsList.next(i.slice(0, this.itemPerPage))
        this._defaultItemsList.next(i)
      }),
    ).subscribe()
  }

  setItemPerPage(itemsQuantityPerPage: number, isFavorite: boolean = false): void {
    this.itemPerPage = itemsQuantityPerPage
    const actualResearch = this.getSearchedValue(isFavorite)
    this.searchItem(actualResearch, isFavorite)
  }

  getItemPerPage(): number {
    return this.itemPerPage
  }

  setPageDashboard(page: number): void {
    if (page > 0) this.actualPageDashboard = page;
    const actualResearch = this.getSearchedValue()
    this.searchItem(actualResearch)
  }

  setSearchedValue(value: string, isFavorite: boolean = false): void {
    isFavorite ? this.searchedValueFavorite = value : this.searchedValueDashboard = value
  }

  getSearchedValue(isFavorite: boolean = false): string {
    return isFavorite ? this.searchedValueFavorite : this.searchedValueDashboard
  }
}
