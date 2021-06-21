import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeFavoriteComponent} from './badge-favorite.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HarnessLoader} from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {of} from "rxjs";

describe('BadgeFavoriteComponent', () => {
  let component: BadgeFavoriteComponent;
  let fixture: ComponentFixture<BadgeFavoriteComponent>;
  let loader: HarnessLoader;

  class ItemsServiceMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [BadgeFavoriteComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ItemsServiceMock, useValue: new ItemsServiceMock()
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeFavoriteComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have 0 elements at the start of application', () => {
    fixture = TestBed.createComponent(BadgeFavoriteComponent);
    component = fixture.componentInstance;
    expect(component.favoriteQuantity).toBe(0);
  });


  it('should have 1 elements if in the stream there is one element', () => {
    fixture = TestBed.createComponent(BadgeFavoriteComponent);
    component = fixture.componentInstance;

    const expectedValue = 1
    const favoriteDefaultItemsList$ = of([{
      "title": "iPhone 6S Oro",
      "description": "Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.",
      "price": "740",
      "email": "iphonemail@wallapop.com",
      "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png"
    }])

    favoriteDefaultItemsList$.subscribe((i) => {
      component.favoriteQuantity = i.length;
      expect(component.favoriteQuantity).toBe(expectedValue);
    })

  });

  it('should emit open dialog on click', async () => {
    fixture = TestBed.createComponent(BadgeFavoriteComponent);
    component = fixture.componentInstance;
    spyOn(component.openDialogEvent, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#showFavoriteDialog');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.openDialogEvent.emit).toHaveBeenCalled();
  });


});
