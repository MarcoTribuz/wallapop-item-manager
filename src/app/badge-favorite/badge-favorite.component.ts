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
    this.itemService.defaultItemsList$.subscribe((items: IItem[]) => {
      console.log("ba", items)
      this.favoriteQuantity = items.filter((i) => i.favorite).length
    })
  }

  openDialog(): void{
    console.log("openDialog")
    this.openDialogEvent.emit(true)
  }

}
