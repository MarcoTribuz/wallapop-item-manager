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
  private _defaultFavoriteItemsList: BehaviorSubject<any> = new BehaviorSubject([]);
  private _defaultItemsList: BehaviorSubject<any> = new BehaviorSubject([]);
  private itemPerPage: number = 5
  private startPositionDashboard: number = 0
  private startPositionFavorite: number = 0
  private itemsUrl = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';
  private searchedValueDashboard: string = ''
  private searchedValueFavorite: string = ''

  public itemsList$ = this._itemsList.asObservable()
  public favoriteItemsList$ = this._favoriteItemsList.asObservable()
  public favoriteDefaultItemsList$ = this._defaultFavoriteItemsList.asObservable()

  constructor(private http: HttpClient) {
  }

  switchFavorite(item: IItem): void {
    item.favorite = !item.favorite
    this.updateFavoriteDefaultList()
    this.searchItem()
    this.searchItemFavorite()
  }

  search(value: string): void {
    this.setSearchedValue(value, false)
    this.searchItem()
  }

  searchFavorite (value: string): void {
    this.setSearchedValue(value, true)
    this.searchItemFavorite()
  }

  searchItem(): void {
    const itemsList = this._defaultItemsList.getValue()
    const searchedValue = this.getSearchedValue(false)
    const filtered = searchedValue === '' ? itemsList : itemsList.filter((it: IItem) => it.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()))
    const startPosition = this.getStartPosition(false)
    if (startPosition >= itemsList.length || startPosition < 0) return
    const itemsPerPage = this.getItemPerPage()
    const slicedList = filtered.slice(startPosition, startPosition + itemsPerPage)
    this.updateDashBoardBehaviourSubjects(slicedList)
  }

  searchItemFavorite (): void {
    const itemsFavoriteList = this._defaultFavoriteItemsList.getValue()
    const searchedValue = this.getSearchedValue(true)
    const filteredFavorite = searchedValue === '' ? itemsFavoriteList : itemsFavoriteList.filter((it: IItem) => it.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()))
    const startPosition = this.getStartPosition(true)
    if (startPosition > itemsFavoriteList.length || startPosition < 0) return
    const itemsPerPage = this.getItemPerPage()
    const slicedList = filteredFavorite.slice(startPosition, startPosition + itemsPerPage)
    this.updateFavoriteBehaviourSubject(slicedList)
  }

  updateDashBoardBehaviourSubjects(items: IItem[]) {
    this._itemsList.next(items)
    this._defaultItemsList.next(this._defaultItemsList.getValue())
  }

  updateFavoriteBehaviourSubject(items: IItem[]) {
    const itemsList = this._defaultItemsList.getValue()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this._favoriteItemsList.next(items)
    this._defaultFavoriteItemsList.next(favorite)
  }

  updateFavoriteDefaultList(): void {
    const itemsList = this._defaultItemsList.getValue()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this._defaultFavoriteItemsList.next(favorite)
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
        this._favoriteItemsList.next([])
        this._defaultFavoriteItemsList.next([])
        this._defaultItemsList.next(i)
      }),
    ).subscribe()
  }

  getItemPerPage(): number {
    return this.itemPerPage
  }

  setSearchedValue(value: string, isFavorite: boolean = false): void {
    isFavorite ? this.searchedValueFavorite = value : this.searchedValueDashboard = value
  }

  getSearchedValue(isFavorite: boolean = false): string {
    return isFavorite ? this.searchedValueFavorite : this.searchedValueDashboard
  }

  nextPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemPerPage()
    const itemsList = isFavorite ? this._defaultFavoriteItemsList.getValue() : this._defaultItemsList.getValue()
    if (start >= itemsList.length || (start + itemPerPage) >= itemsList.length) return
    this.setStartPosition(start + itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  prevPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemPerPage()
    if (start === 0) return
    this.setStartPosition(start - itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  getStartPosition(isFavorite: boolean): number {
    return isFavorite ? this.startPositionFavorite : this.startPositionDashboard
  }

  setStartPosition(startPosition: number, isFavorite: boolean = false): void {
    isFavorite ? this.startPositionFavorite = startPosition : this.startPositionDashboard = startPosition
  }
}
