import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IItem} from "../interfaces/IItem";
import {ItemService} from "../services/item/item.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() isFavorite: boolean = false;
  items: IItem[] = [];

  displayedColumns: string[] = []

  constructor(public itemService: ItemService) {
  }

  ngOnInit(): void {
    this.isFavorite ? this.displayedColumns = ['title', 'image', 'favorite'] : this.displayedColumns = ['title', 'description', 'price', 'email', 'image', 'favorite'];
    if (this.isFavorite)
      this.itemService.favoriteItemsList$.subscribe((items: IItem[]) => {
        this.items = items
      })
    else
      this.itemService.itemsList$.subscribe((items: IItem[]) => {
        this.items = items
      })
    this.itemService.fetchItems()
  }

  ngOnDestroy(): void {
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
}
