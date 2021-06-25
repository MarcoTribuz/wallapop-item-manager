import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldComponent } from './search-field.component';
import {HarnessLoader} from "@angular/cdk/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {TestbedHarnessEnvironment} from "@angular/cdk/testing/testbed";
import {MatInputHarness} from "@angular/material/input/testing";

describe('SearchFieldComponent', () => {
  let component: SearchFieldComponent;
  let fixture: ComponentFixture<SearchFieldComponent>;
  let loader: HarnessLoader;

  class ItemsServiceMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ SearchFieldComponent ],
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
    fixture = TestBed.createComponent(SearchFieldComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call search method', async () => {
    const inputField = await loader.getHarness<MatInputHarness>(MatInputHarness);
    const test = spyOn(component,'search')
    await inputField.setValue('iphone');
    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
  });

  it ('should call search item service', async () => {
    const test = spyOn(component.itemService,'search')
    component.isFavorite = false
    component.search('iphone')
    expect(test).toHaveBeenCalled();
  });

  it ('should call search item favorite service', async () => {
    const test = spyOn(component.itemService,'searchItemFavorite')
    component.isFavorite = true
    component.search('iphone')
    expect(test).toHaveBeenCalled();
  });

});
