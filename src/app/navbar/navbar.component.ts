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
    console.log("Event Navbar", event)
    this.openDialogEvent.emit(event)
  }

}
