import { Component, OnInit } from '@angular/core';
import {ItemService} from "../services/item/item.service";

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  search(value: string): void {
    console.log("search Field", value)
    this.itemService.searchItem(value)
  }

}
