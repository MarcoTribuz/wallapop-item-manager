import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatTableModule} from "@angular/material/table";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let loader: HarnessLoader;

  class ItemsServiceMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule
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

  it('Header should change if favorite is true', () => {
    const expectedValue = ['title', 'image', 'favorite']
    component.isFavorite = true
    component.ngOnInit()
    expect(component.displayedColumns).toEqual(expectedValue)
  });

  it('Prev Page should be called', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    spyOn(component, 'prevPage');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#prevPage');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.prevPage).toHaveBeenCalled();
  });

  it('item service prev page should be called', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    const test = spyOn(component.itemService, 'prevPage');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#prevPage');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
  });

  it('item service next page should be called', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    const test = spyOn(component.itemService, 'nextPage');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('#nextPage');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
  });

  it('item service switch favorite should be called', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    const test = spyOn(component.itemService, 'switchFavorite');

    component.switchFavourite({
      "title": "Polaroid 635",
      "description": "Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.",
      "price": "50",
      "email": "cameramail@wallapop.com",
      "favorite": false,
      "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png"
    })

    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
  });

  it('Should call sort by in service', () => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.isFavorite = false
    const test = spyOn(component.itemService, 'sortBy');
    component.sortBy('title')
    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
  });

});
