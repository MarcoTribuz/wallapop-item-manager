import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() openDialogEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  openDialog(event: boolean): void {
    this.openDialogEvent.emit(event)
  }

}
