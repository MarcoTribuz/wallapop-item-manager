import {Component, OnInit} from '@angular/core';
import {IItem} from "../interfaces/IItem";
import {ItemService} from "../services/item/item.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  items: IItem[] = [];
  displayedColumns: string[] = ['title', 'description', 'price', 'email', 'image', 'favorite'];

  //todo unsubscribe
  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.itemService.itemsList$.subscribe((i) => {
      console.log("ciao", i)
      this.items = i
    })
    this.itemService.fetchItems()
  }

  ngOnDestroy(): void {
  }

  switchFavourite(item: IItem): void{
    this.itemService.switchFavorite(item)
  }
}
