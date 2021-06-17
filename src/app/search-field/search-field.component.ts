import { Component, OnInit } from '@angular/core';
import {ItemService} from "../services/item/item.service";
import {Observable, of, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Item} from "../interfaces/item";


@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  heroes$!: Observable<Item[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: ItemService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        console.log("Porco", term)
        return of([])}),
    );
  }

}
