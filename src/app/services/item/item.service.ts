import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, filter, map, tap} from 'rxjs/operators';
import {IItems} from "../../interfaces/IItems";
import {IItem} from "../../interfaces/IItem";

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  defaultValue: IItem[] = []
  private _itemsList: BehaviorSubject<IItem[]> = new BehaviorSubject(this.defaultValue);
  private _favoriteItemsList: BehaviorSubject<IItem[]> = new BehaviorSubject(this.defaultValue);
  private _defaultFavoriteItemsList: BehaviorSubject<IItem[]> = new BehaviorSubject(this.defaultValue);
  private _defaultItemsList: BehaviorSubject<IItem[]> = new BehaviorSubject(this.defaultValue);
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

  /**
   * Switch flag favorite
   * @param {IItem} item - item where switch the flag
   */
  switchFavorite(item: IItem): void {
    item.favorite = !item.favorite
    this.updateFavoriteDefaultList()
    this.searchItem()
    this.searchItemFavorite()
  }

  /**
   * Search in default table
   * @param {string} value - text to search
   */
  search(value: string): void {
    this.setSearchedValue(value, false)
    this.searchItem()
  }

  /**
   * Search value in favorite table
   * @param {string} value - text to search
   */
  searchFavorite(value: string): void {
    this.setSearchedValue(value, true)
    this.searchItemFavorite()
  }

  /**
   * Search inside the default behaviour subject
   */
  searchItem(): void {
    const itemsList = this.getDefaultItemListBS()
    const searchedValue = this.getSearchedValue(false)
    const filtered = searchedValue === '' ? itemsList : itemsList.filter((it: IItem) => this.filterFunction(it, searchedValue, false))
    const startPosition = this.getStartPosition(false)
    if (startPosition >= itemsList.length || startPosition < 0) return
    const itemsPerPage = this.getItemsPerPage()
    const slicedList = filtered.slice(startPosition, startPosition + itemsPerPage)
    this.updateDashBoardBehaviourSubjects(slicedList)
  }

  /**
   * Search inside the favorite behaviour subject
   */
  searchItemFavorite(): void {
    const itemsFavoriteList = this.getDefaultFavoriteItemListBS()
    const searchedValue = this.getSearchedValue(true)
    const filteredFavorite = searchedValue === '' ? itemsFavoriteList : itemsFavoriteList.filter((it: IItem) => this.filterFunction(it, searchedValue, true))
    const startPosition = this.getStartPosition(true)
    if (startPosition > itemsFavoriteList.length || startPosition < 0) return
    const itemsPerPage = this.getItemsPerPage()
    const slicedList = filteredFavorite.slice(startPosition, startPosition + itemsPerPage)
    this.updateFavoriteBehaviourSubject(slicedList)
  }

  /**
   * Method to filter when a user search something
   * @param {IItem} item - item to check
   * @param {string} searchedValue - the string to compare
   * @param {boolean} isFavorite - if the search will perform on title (favorite) or title, description, price, email (not favorite)
   */
  filterFunction(item: IItem, searchedValue: string, isFavorite: boolean): boolean {
    if (isFavorite) return item.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())
    else return item.title.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.description.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.price.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()) ||
      item.email.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase())
  }

  /**
   * Update Default behaviour subject
   * @param {IItem[]} items - items to update
   */
  updateDashBoardBehaviourSubjects(items: IItem[]) {
    this.setItemListBS(items)
    const defaultItemsList = this.getDefaultItemListBS()
    this.setDefaultItemListBS(defaultItemsList)
  }

  /**
   * Update the favorite Behaviour subject
   * @param {IItem[]} items - items to update
   */
  updateFavoriteBehaviourSubject(items: IItem[]) {
    const itemsList = this.getDefaultItemListBS()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this.setFavoriteItemListBS(items)
    this.setDefaultFavoriteItemListBS(favorite)
  }

  /**
   * Update the favorite default behaviour subject
   */
  updateFavoriteDefaultList(): void {
    const itemsList = this.getDefaultItemListBS()
    const favorite = itemsList.filter((i: IItem) => i.favorite)
    this.setDefaultFavoriteItemListBS(favorite)
  }

  /**
   * Entry point
   */
  fetchItems(): void {
    const itemsList = this.getDefaultItemListBS()
    if (itemsList.length > 0) return
    this.http.get<IItems>(this.itemsUrl).pipe(
      map((iList: IItems) => {
        return iList.items.map((i: IItem) => {
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
      catchError(this.handleError<IItem[]>('fetchItems', []))
    ).subscribe()
  }

  /**
   * To the next five items
   * @param {boolean} isFavorite - if is an operation from the favorite table
   */
  nextPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemsPerPage()
    const itemsList = isFavorite ? this.getDefaultFavoriteItemListBS() : this.getDefaultItemListBS()
    if (start >= itemsList.length || (start + itemPerPage) >= itemsList.length) return
    this.setStartPosition(start + itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  sortBy(sortType: 'title' | 'description' | 'email' | 'price', isFavorite: boolean, isAscending: boolean): void {
    const itemsList = this.getDefaultItemListBS()
    const searchedValue = this.getSearchedValue(isFavorite)
    const filteredFavorite = searchedValue === '' ? itemsList : itemsList.filter((it: IItem) => this.filterFunction(it, searchedValue, isFavorite))
    let sortedList: IItem[] = []

    if (isAscending) sortedList = filteredFavorite.sort((a, b) =>{
      if (sortType !== 'price') return a[sortType] < b[sortType] ? -1 : a[sortType] > b[sortType] ? 1 : 0
      else return parseInt(a[sortType]) < parseInt(b[sortType]) ? -1 : parseInt(a[sortType]) > parseInt(b[sortType]) ? 1 : 0
    })
    else sortedList = filteredFavorite.sort((a, b) => {
      if (sortType !== 'price') return a[sortType] < b[sortType] ? 1 : a[sortType] > b[sortType] ? -1 : 0
      else return parseInt(a[sortType]) < parseInt(b[sortType]) ? 1 : parseInt(a[sortType]) > parseInt(b[sortType]) ? -1 : 0
    })

    const startPosition = this.getStartPosition(false)
    if (startPosition >= itemsList.length || startPosition < 0) return
    const itemsPerPage = this.getItemsPerPage()
    const slicedList = sortedList.slice(startPosition, startPosition + itemsPerPage)

    this.updateDashBoardBehaviourSubjects(slicedList)
  }

  /**
   * To the previous 5 items
   * @param {boolean} isFavorite - if is an operation from the favorite table
   */
  prevPage(isFavorite: boolean): void {
    const start = this.getStartPosition(isFavorite)
    const itemPerPage = this.getItemsPerPage()
    if (start === 0) return
    this.setStartPosition(start - itemPerPage, isFavorite)
    isFavorite ? this.searchItemFavorite() : this.searchItem()
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, operation);
      return of(result as T);
    };
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

  getFavoriteItemListBS(): IItem[] {
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
