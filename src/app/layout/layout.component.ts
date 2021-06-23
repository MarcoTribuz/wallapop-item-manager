import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FavoriteDialogComponent} from "../favorite-dialog/favorite-dialog.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(value: boolean): void {
    this.dialog.open(FavoriteDialogComponent, {
      width: '1200px',
    });
  }

}
