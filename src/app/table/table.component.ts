import {Component, Input, OnInit} from '@angular/core';
import {IItem} from "../interfaces/IItem";
import {ItemService} from "../services/item/item.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() isFavorite: boolean = false;
  items: IItem[] = [];
  displayedColumns: string[] = []
  title: boolean = false
  email: boolean = false
  description: boolean = false
  price: boolean = false

  constructor(public itemService: ItemService) {
  }

  ngOnInit(): void {
    if (this.isFavorite) {
      this.displayedColumns = ['title', 'image', 'favorite']
      this.itemService.favoriteItemsList$.subscribe((items: IItem[]) => {
        this.items = items
      })
    } else {
      this.displayedColumns = ['title', 'description', 'price', 'email', 'image', 'favorite']
      this.itemService.itemsList$.subscribe((items: IItem[]) => {
        this.items = items
      })
    }
    this.itemService.fetchItems()
  }

  switchFavourite(item: IItem): void {
    this.itemService.switchFavorite(item)
  }

  nextPage(): void {
    this.itemService.nextPage(this.isFavorite)
  }

  prevPage(): void {
    this.itemService.prevPage(this.isFavorite)
  }

  sortBy(sortType: 'title' | 'description' | 'email' | 'price') {
    if (!this.isFavorite) {
      let isAscending: boolean
      this.resetSortTypeVariable()
      this[sortType] = !this[sortType]
      isAscending = this[sortType]

      this.itemService.sortBy(sortType, false, isAscending)
    }
  }
  resetSortTypeVariable(){
    this.title = false
    this.description = false
    this.price = false
    this.email = false
  }
}
