import {TestBed} from '@angular/core/testing';

import {ItemService} from './item.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IItem} from "../../interfaces/IItem";

const itemsList: IItem[] = [
  {
    "title": "iPhone 6S Oro",
    "description": "Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.",
    "price": "740",
    "email": "iphonemail@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/iphone.png"
  },
  {
    "title": "Polaroid 635",
    "description": "Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.",
    "price": "50",
    "email": "cameramail@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png"
  },
  {
    "title": "Bolso piel marca Hoss",
    "description": "Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.",
    "price": "250",
    "email": "bagmail@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png"
  },
  {
    "title": "Reloj de Daniel Wellington",
    "description": "Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ",
    "price": "100",
    "email": "watchmail@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/watch.png"
  },
  {
    "title": "Coche antiguo americano",
    "description": "Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas",
    "price": "210000",
    "email": "carmail@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png"
  },
  {
    "title": "Barbacoa",
    "description": "Barbacoa en buen estado. La he usado pocas veces y está casi nueva. Ideal para fiestas y celebraciones",
    "price": "120",
    "email": "barbecue@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/barbecue.png"
  },
  {
    "title": "Sofa de piel auténtica",
    "description": "Vendo sofá de piel negro. Tiene signos evidentes de uso, de ahí el precio. Es muy cómodo y bonito",
    "price": "75",
    "email": "sofa@wallapop.com",
    "favorite": false,
    "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/sofa.png"
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

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });

  it('Items List observable should be filled', async () => {
    service.updateDashBoardBehaviourSubjects(itemsList)
    service.itemsList$.subscribe(res => {
      expect(res).toBe(itemsList)
    })
  });

  it('Get Item per page should return 5', async () => {
    const itemsPerPage = service.getItemsPerPage()
    expect(itemsPerPage).toEqual(5)
  });

  it('Search value should be stocked in the right path Not Favorite', async () => {
    const valueExpected = 'ciao'
    const isFavorite = false
    service.setSearchedValue(valueExpected, isFavorite)
    const result = service.getSearchedValue(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  it('Search value should be stocked in the right path Favorite', async () => {
    const valueExpected = 'ciao'
    const isFavorite = true
    service.setSearchedValue(valueExpected, isFavorite)
    const result = service.getSearchedValue(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  it('Slice element should be stocked in the right path Not Favorite', async () => {
    const valueExpected = 10
    const isFavorite = false
    service.setStartPosition(valueExpected, isFavorite)
    const result = service.getStartPosition(isFavorite)
    expect(result).toEqual(valueExpected)
  });

  it('SearchItem function should be called', async () => {
    const test = spyOn(service, 'searchItem')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('updateFavoriteDefaultList function should be called', async () => {
    const test = spyOn(service, 'updateFavoriteDefaultList')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('searchItemFavorite function should be called', async () => {
    const test = spyOn(service, 'searchItemFavorite')
    service.switchFavorite(itemsList[0])
    expect(test).toHaveBeenCalled();
  });

  it('setSearchedValue function should be called', async () => {
    const test = spyOn(service, 'setSearchedValue')
    service.search('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('searchItem function should be called', async () => {
    const test = spyOn(service, 'searchItem')
    service.search('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('searchFavorite function should be called', async () => {
    const test = spyOn(service, 'searchFavorite')
    service.searchFavorite('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('searchItemFavorite function should be called', async () => {
    const test = spyOn(service, 'searchItemFavorite')
    service.searchFavorite('ciao')
    expect(test).toHaveBeenCalled();
  });

  it('Search item should be called after next page call not Favorite', async () => {
    const test = spyOn(service, 'searchItem')
    const isFavorite = false
    service.setStartPosition(0, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.nextPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('Search item should be called after next page call Favorite', async () => {
    const test = spyOn(service, 'searchItemFavorite')
    const isFavorite = true
    service.setStartPosition(0, isFavorite)
    service.setDefaultFavoriteItemListBS(itemsList)
    service.nextPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('Search item should be called after prev page call not Favorite', async () => {
    const test = spyOn(service, 'searchItem')
    const isFavorite = false
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.prevPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('Search item should be called after prev page call Favorite', async () => {
    const test = spyOn(service, 'searchItemFavorite')
    const isFavorite = true
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.prevPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects called when user search', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.prevPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects called when user search a favorite', async () => {
    const test = spyOn(service, 'updateFavoriteBehaviourSubject')
    const isFavorite = true
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.prevPage(isFavorite)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by title descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = false
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('title', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by price descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = false
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('price', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by title descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = true
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('title', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by price descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = true
    service.setSearchedValue('ciao', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('price', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by title descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = false
    service.setSearchedValue('', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('title', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by price descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = false
    service.setSearchedValue('', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('price', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by title descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = true
    service.setSearchedValue('', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('title', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('updateDashBoardBehaviourSubjects should be called after sorting by price descending', async () => {
    const test = spyOn(service, 'updateDashBoardBehaviourSubjects')
    const isFavorite = false
    const isAscending = true
    service.setSearchedValue('', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(itemsList)
    service.sortBy('price', isFavorite, isAscending)
    expect(test).toHaveBeenCalled()
  });

  it('Should sort by title', async () => {
    const isFavorite = false
    const isAscending = true

    const toSort = [
      {
        "title": "Polaroid 635",
        "description": "Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.",
        "price": "50",
        "email": "cameramail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png"
      },
      {
        "title": "Bolso piel marca Hoss",
        "description": "Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.",
        "price": "250",
        "email": "bagmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png"
      },
      {
        "title": "Reloj de Daniel Wellington",
        "description": "Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ",
        "price": "100",
        "email": "watchmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/watch.png"
      },
      {
        "title": "Coche antiguo americano",
        "description": "Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas",
        "price": "210000",
        "email": "carmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png"
      },
      {
        "title": "Barbacoa",
        "description": "Barbacoa en buen estado. La he usado pocas veces y está casi nueva. Ideal para fiestas y celebraciones",
        "price": "120",
        "email": "barbecue@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/barbecue.png"
      }]

    const expectedSorted = [
      {
        "title": "Barbacoa",
        "description": "Barbacoa en buen estado. La he usado pocas veces y está casi nueva. Ideal para fiestas y celebraciones",
        "price": "120",
        "email": "barbecue@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/barbecue.png"
      },
      {
        "title": "Bolso piel marca Hoss",
        "description": "Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.",
        "price": "250",
        "email": "bagmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/bag.png"
      },
      {
        "title": "Coche antiguo americano",
        "description": "Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas",
        "price": "210000",
        "email": "carmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/car.png"
      },
      {
        "title": "Polaroid 635",
        "description": "Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.",
        "price": "50",
        "email": "cameramail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/camera.png"
      },
      {
        "title": "Reloj de Daniel Wellington",
        "description": "Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ",
        "price": "100",
        "email": "watchmail@wallapop.com",
        "favorite": false,
        "image": "https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/img/watch.png"
      }]
    service.setSearchedValue('', isFavorite)
    service.setStartPosition(5, isFavorite)
    service.setDefaultItemListBS(toSort)
    service.setItemListBS(toSort)
    service.sortBy('title', isFavorite, isAscending)
    const sortedList = service.getItemListBS()
    expect(sortedList).toEqual(expectedSorted)
  });

});
