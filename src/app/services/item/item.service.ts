import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
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
  private itemsPerPage: number = 5
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

  //todo catch error
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
    const itemsList = this.getDefaultItemListBS()
    const searchedValue = this.getSearchedValue(false)
    const filtered = searchedValue === '' ? itemsList : itemsList.filter((it: IItem) => this.filterFunction(it, searchedValue))
    const startPosition = this.getStartPosition(false)
    if (startPosition >= itemsList.length || startPosition < 0) return
    const itemsPerPage = this.getItemsPerPage()
    const slicedList = filtered.slice(startPosition, startPosition + itemsPerPage)
    this.updateDashBoardBehaviourSubjects(slicedList)
  }

  searchItemFavorite (): void {
    const itemsFavoriteList = this.getDefaultFavoriteItemListBS()
    const searchedValue = this.getSearchedValue(true)
    const filteredFavorite = searchedValue === '' ? itemsFavoriteList : itemsFavoriteList.filter((it: IItem) => this.filterFunction(it, searchedValue))
    const startPosition = this.getStartPosition(true)
    if (startPosition > itemsFavoriteList.length || startPosition < 0) return
    const itemsPerPage = this.getItemsPerPage()
    const slicedList = filteredFavorite.slice(startPosition, startPosition + itemsPerPage)
    this.updateFavoriteBehaviourSubject(slicedList)
  }

  filterFunction(item: IItem, searchedValue: string ): boolean {
    return item.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.description.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.price.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.email.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())
  }

  updateDashBoardBehaviourSubjects(items: IItem[]) {
    this.setItemListBS(items)
    const defaultItemsList = this.getDefaultItemListBS()
    this.setDefaultItemListBS(defaultItemsList)
  }

  updateFavoriteBehaviourSubject(items: IItem[]) {
    const itemsList = this.getDefaultItemListBS()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this.setFavoriteItemListBS(items)
    this.setDefaultFavoriteItemListBS(favorite)
  }

  updateFavoriteDefaultList(): void {
    const itemsList = this.getDefaultItemListBS()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this.setDefaultFavoriteItemListBS(favorite)
  }

  fetchItems(): void {
    const itemsList = this.getDefaultItemListBS()
    if (itemsList.length > 0) return
    this.http.get<IItems>(this.itemsUrl).pipe(
      map((iList: IItems) => {
        return iList.items.map((i: IItem, index) => {
          return {...i, favorite: false}
        })
      }),
      tap((i: IItem[]) => {
        const itemsPerPage = this.getItemsPerPage()
        this.setItemListBS(i.slice(0, itemsPerPage))
        this.setFavoriteItemListBS([])
        this.setDefaultFavoriteItemListBS([])
        this.setDefaultItemListBS(i)
      }),
    ).subscribe()
  }

  nextPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemsPerPage()
    const itemsList = isFavorite ? this.getDefaultFavoriteItemListBS() : this.getDefaultItemListBS()
    if (start >= itemsList.length || (start + itemPerPage) >= itemsList.length) return
    this.setStartPosition(start + itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  prevPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemsPerPage()
    if (start === 0) return
    this.setStartPosition(start - itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  /*
    GET And SETTER
   */

  setItemListBS(items: IItem[]): void {
    this._itemsList.next(items)
  }

  getItemListBS(): IItem[] {
    return this._itemsList.getValue()
  }

  setFavoriteItemListBS(items: IItem[]): void {
    this._favoriteItemsList.next(items)
  }

  getFavoriteItemListBS(): IItem[]{
    return this._favoriteItemsList.getValue()
  }

  setDefaultItemListBS(items: IItem[]): void {
    this._defaultItemsList.next(items)
  }

  getDefaultItemListBS(): IItem[] {
    return this._defaultItemsList.getValue()
  }

  setDefaultFavoriteItemListBS(items: IItem[]): void {
    this._defaultFavoriteItemsList.next(items)
  }

  getDefaultFavoriteItemListBS(): IItem[] {
    return this._defaultFavoriteItemsList.getValue()
  }

  getItemsPerPage(): number {
    return this.itemsPerPage
  }

  setSearchedValue(value: string, isFavorite: boolean): void {
    if (isFavorite) this.searchedValueFavorite = value
    else this.searchedValueDashboard = value
  }

  getSearchedValue(isFavorite: boolean): string {
    return isFavorite ? this.searchedValueFavorite : this.searchedValueDashboard
  }

  getStartPosition(isFavorite: boolean): number {
    return isFavorite ? this.startPositionFavorite : this.startPositionDashboard
  }

  setStartPosition(startPosition: number, isFavorite: boolean): void {
    if (isFavorite) this.startPositionFavorite = startPosition
    else this.startPositionDashboard = startPosition
  }

}
