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

  constructor(public itemService: ItemService) {
  }

  ngOnInit(): void {
    if (this.isFavorite) {
      this.displayedColumns = ['title', 'image', 'favorite']
      this.itemService.favoriteItemsList$.subscribe((items: IItem[]) => {
        this.items = items
      })
    } else{
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

  sortBy(sortType: string) {
    if (!this.isFavorite) this.itemService.sortBy(sortType, false)
  }
}
