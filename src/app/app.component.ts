import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FavoriteDialogComponent} from "./favorite-dialog/favorite-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'wallapop-item-manager';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(value: boolean): void {
    this.dialog.open(FavoriteDialogComponent);
  }

}
