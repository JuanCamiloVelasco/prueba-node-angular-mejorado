import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  fecha1= Date;
  fecha2= Date;
value: any;
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
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
}
