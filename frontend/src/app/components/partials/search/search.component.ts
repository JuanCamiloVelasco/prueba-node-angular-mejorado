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
  searchTerm = '';
  fecha1= Date;
  fecha2= Date;
  tipo = tipos

value: any;
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm && params.fecha1 && params.fecha2) {
        this.searchTerm = params.searchTerm;
        this.fecha1 = params.fecha1;
        this.fecha2 = params.fecha2;
      }
      else if(params.searchTerm) this.searchTerm = params.searchTerm;
      else if(params.fecha1 && params.fecha2) {
        this.fecha1 = params.fecha1;
        this.fecha2 = params.fecha2;
      }
    });
  }

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
