import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../services/item/item.service";

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {

  @Input() isFavorite: boolean = false;

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
  }

  search(value: string): void {
    this.isFavorite ? this.itemService.searchFavorite(value) : this.itemService.search(value)
  }

}
