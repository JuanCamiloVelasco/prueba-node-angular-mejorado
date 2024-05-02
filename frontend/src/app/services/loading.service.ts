import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // mi service para la pantalla de carga que solo tiene los metodos para mostrar y ocultar la carga y un getter para que sea observable
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  
  showLoading(){
    this.isLoadingSubject.next(true);
  }

  hideLoading(){
    this.isLoadingSubject.next(false);
  }

  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
