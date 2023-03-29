import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall, PaisMedium } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService{

  private _regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  private _apiUrl: string = 'https://restcountries.com/v2/';

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor( private http: HttpClient) { }
  



  getPaisesPorRegion( region: string ):Observable<PaisSmall[]> {
    return this.http.get<PaisSmall[]>(`${this._apiUrl}region/${region}?fields=name,alpha3Code`);
  }

  getPaisPorCodigo( codigo: string ):Observable<PaisMedium | null>{
    if(!codigo) return of(null);
    return this.http.get<PaisMedium>(`${this._apiUrl}alpha?codes=${codigo}&fields=alpha3Code,name,borders`)
  }


}
