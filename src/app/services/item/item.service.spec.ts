import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IItem} from "../../interfaces/IItem";

const itemsList: IItem[] = [{
  title: 'iPhone 6S Oro',
  description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
  email: 'iphonemail@wallapop.com',
  favorite: false,
  image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
  price: '740',
}]

const itemsListFavorite: IItem[] = [{
  title: 'iPhone 6S Oro',
  description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
  email: 'iphonemail@wallapop.com',
  favorite: false,
  image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
  price: '740',
}]

describe('ItemService', () => {
  let service: ItemService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ItemService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', async() => {
    expect(service).toBeTruthy();
  });

  it('Items List observable should be filled', async() => {
    service.updateDashBoardBehaviourSubjects(itemsList)
    service.itemsList$.subscribe(res => {
      expect(res).toBe(itemsList)
    })
  });

  it('Get Item per page should return 5', async() => {
    const itemsPerPage = service.getItemPerPage()
    expect(itemsPerPage).toEqual(5)
  });

  it('Search value should be stocked in the right path Not Favorite', async() => {
    const valueExpected = 'ciao'
    const isFavorite = false
    service.setSearchedValue(valueExpected, isFavorite)
    const result = service.getSearchedValue(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  it('Search value should be stocked in the right path Favorite', async() => {
    const valueExpected = 'ciao'
    const isFavorite = true
    service.setSearchedValue(valueExpected, isFavorite)
    const result = service.getSearchedValue(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  it('Slice element should be stocked in the right path Not Favorite', async() => {
    const valueExpected = 10
    const isFavorite = false
    service.setStartPosition(valueExpected, isFavorite)
    const result = service.getStartPosition(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  /*it('Slice element should be stocked in the right path Favorite', async() => {
    const valueExpected = 10
    const isFavorite = true
    service.setStartPosition(valueExpected, isFavorite)
    const result = service.getStartPosition(isFavorite)
    expect(result).toEqual(valueExpected)
  });*/

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'searchItem')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'updateFavoriteDefaultList')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'searchFavorite')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'setSearchedValue')
    service.search('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'searchItem')
    service.search('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'searchFavorite')
    service.searchFavorite('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'searchItemFavorite')
    service.searchFavorite('ciao')
    expect(test).toHaveBeenCalled();
  });

  /*it('Slice element should be stocked in the right path  Favorite', async() => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    service.updateDashBoardBehaviourSubjects(itemsList)
    service.setStartPosition(1)
    service.searchItem()
    expect(test).toHaveBeenCalled();
  });*/

  /*it('cazzo', async() => {
    const valueExpected = 10
    const isFavorite = false
    service.setStartPosition(valueExpected, isFavorite)
    service.updateDashBoardBehaviourSubjects(itemsList)
    service.nextPage(isFavorite)
    const test = service.getStartPosition(isFavorite)
    expect(test).toEqual(valueExpected + 5)
  });*/

  /*it('cazzo 1', async() => {
    const valueExpected = 10
    const isFavorite = true
    service.setStartPosition(valueExpected, isFavorite)
    service.updateDashBoardBehaviourSubjects(itemsList)
    spyOn(service, 'searchItemFavorite')
    service.nextPage(isFavorite)
    expect(service.searchItemFavorite).toHaveBeenCalled();
  });*/
});
