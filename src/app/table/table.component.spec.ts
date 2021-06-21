import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatButtonHarness} from "@angular/material/button/testing";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;

  class ItemsServiceMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ TableComponent ],
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
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next method', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    spyOn(component, 'nextPage');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#nextPage');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  });

  it('should call prev method', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    spyOn(component, 'prevPage');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#prevPage');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.prevPage).toHaveBeenCalled();
  });

  it('should call switch favorite method', async () => {
    /*fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    spyOn(component, 'switchFavourite');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.favorite');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();*/
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.items = [{
      "id": 0,
      "title": "iPhone 6S Oro",
      "description": "Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.",
      "price": "740",
      "email": "iphonemail@wallapop.com",
      "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png",
      "favorite": false
    }]

    fixture.detectChanges()
    spyOn(component, 'switchFavourite');
    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({selector: '.favorite'}));
    await button.click();

    expect(component.switchFavourite).toHaveBeenCalled();
  });
});
