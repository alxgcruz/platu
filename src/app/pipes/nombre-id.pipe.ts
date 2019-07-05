import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreId'
})
export class NombreIdPipe implements PipeTransform {

  transform(id: any, array: any): string {

    let texto = '';
    array.find( item => {
      if ( item.id === id ) {
        texto = item.nombre;
      }
    });

    return texto;

  }

}
