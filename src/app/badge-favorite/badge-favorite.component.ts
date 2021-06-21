import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ItemService} from "../services/item/item.service";
import {IItem} from "../interfaces/IItem";

@Component({
  selector: 'app-badge-favorite',
  templateUrl: './badge-favorite.component.html',
  styleUrls: ['./badge-favorite.component.css']
})
export class BadgeFavoriteComponent implements OnInit {

  favoriteQuantity: number = 0
  @Output() openDialogEvent = new EventEmitter<boolean>();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.favoriteDefaultItemsList$.subscribe((items: IItem[]) => {
      this.favoriteQuantity = items.length
    })
  }

  openDialog(): void{
    this.openDialogEvent.emit(true)
  }

}
