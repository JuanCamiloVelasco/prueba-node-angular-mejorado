import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tipos } from 'src/app/shared/constants/tipos';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  // aqui se almacenara el termino a buscar
  searchTerm = '';
  // almaceno las 2 fechas a consultar
  fecha1= Date;
  fecha2= Date;
  // mi lista de tipos
  tipo = tipos

  // mi constructor con los metodos y librerias a utilizar
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) => {
      // asigno los valores si estos han sido llenados
      if(params.searchTerm) this.searchTerm = params.searchTerm;
      else if(params.fecha1 && params.fecha2) {
        this.fecha1 = params.fecha1;
        this.fecha2 = params.fecha2;
      }
    });
  }

  // dependiendo de la busqueda que se realice, se llevara a la url que tendra el metodo para realizar el filtro deseado
  
  search(term:string):void {
    if(term)
      this.router.navigateByUrl('/buscar/'+ term);
  }

  BuscaFechas(fechaIn:string, fechaFin:string):void{
    if(fechaIn && fechaFin){
      this.router.navigateByUrl('/fecha/'+ fechaIn + '/' + fechaFin);
    }
  }
  
  BuscaTipoFechas(term:string, fechaIn:string, fechaFin:string):void{
    if(term && fechaIn && fechaFin){
      this.router.navigateByUrl('/buscarAvanzada/'+ term + '/' + fechaIn + '/' + fechaFin);
    }
  }
}
