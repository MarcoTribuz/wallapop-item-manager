import { Component, OnInit } from '@angular/core';
import {Item} from "../interfaces/item";
import {ItemService} from "../services/item/item.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  items: Item[] = [];
  displayedColumns: string[] = ['title', 'description', 'price', 'email', 'image', 'favorite'];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(): void {
    this.itemService.getItems().subscribe((i) => {
      console.log("Subscribe", i)
      this.items = i
    })
  }

  switchFavourite(id: number): void{
    console.log("switchFavourite", id)
    this.itemService.switchFavorite(id)
  }
}
