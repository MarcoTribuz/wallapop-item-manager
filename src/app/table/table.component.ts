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
  displayedColumns: string[] = ['title', 'description', 'price', 'email'];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(): void {
    this.itemService.getItems().subscribe((i) => {
      console.log("Observable", i.items)
      this.items = i.items
    })
  }

  selectedItem(item: Item){
    console.log(item)
  }

}
