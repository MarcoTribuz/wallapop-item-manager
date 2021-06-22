import {IItem} from "../../interfaces/IItem";

export function testGetItems(): IItem[] {
  return [
    {
      title: 'iPhone 6S Oro',
      description: 'Vendo un iPhone 6 S color Oro nuevo y sin estrenar. Me han dado uno en el trabajo y no necesito el que me compré. En tienda lo encuentras por 749 euros y yo lo vendo por 740. Las descripciones las puedes encontrar en la web de apple. Esta libre.',
      email: 'iphonemail@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/iphone.png',
      price: '740',
    },
    {
      description: 'Cámara clásica de fotos Polaroid, modelo 635. Las fotos son a super color. Está en perfectas condiciones y es fantástica para coleccionistas. Se necesitan carretes instax 20 para hacer fotos. Tamaño M.',
      email: 'cameramail@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/camera.png',
      price: '50',
      title: 'Polaroid 635'
    },
    {
      description: 'Vendo bolso de piel marrón grande de la marca Hoss. Lo compré hace dos temporadas. Esta en perfectas condiciones, siempre se ha guardado en bolsa de tela para su conservación. Precio original de 400 euros. Lo vendo por 250 porque ya casi no me lo pongo. Tiene varios compartimentos dentro.',
      email: 'bagmail@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/bag.png',
      price: '250',
      title: 'Bolso piel marca Hoss'
    },
    {
      description: 'Reloj de la marca Daniel Wellington usado sólo un mes. Ahora me han regalado otro que me gusta más y es muy parecido; por eso lo vendo. Su precio en tienda son 149 pero lo vendo por 100 euros. Es con la esfera blanca y la correa de piel marron. ',
      email: 'watchmail@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/watch.png',
      price: '100',
      title: 'Reloj de Daniel Wellington'
    },
    {
      description: 'Coche antiguo americano de color marrón. Se tiene que cambiar el motor pero aparte de eso todo funciona correctamente. Interior de piel clara. Ideal para coleccionistas',
      email: 'carmail@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/car.png',
      price: '210000',
      title: 'Coche antiguo americano'
    },
    {
      description: 'Barbacoa en buen estado. La he usado pocas veces y está casi nueva. Ideal para fiestas y celebraciones',
      email: 'barbecue@wallapop.com',
      favorite: false,
      image: 'https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/img/barbecue.png',
      price: '120',
      title: 'Barbacoa'
    }]
}
