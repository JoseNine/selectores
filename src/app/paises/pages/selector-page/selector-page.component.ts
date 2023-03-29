import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall, PaisMedium } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises   :PaisSmall[] = [];
  fronteras: string[] | undefined = [];

  // ui
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private ps: PaisesServiceService) { }

  ngOnInit(): void {

    this.regiones = this.ps.regiones;



    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( _ => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region =>{
          return this.ps.getPaisesPorRegion(region!);
        })
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando= false;
      })    
      
      this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( _ => {this.miFormulario.get('frontera')?.reset('')
        }),
        switchMap( codigo => {return this.ps.getPaisPorCodigo(codigo!);})
        )
        .subscribe( pais => {
          console.log('pais', pais);
          console.log('pais.borders', pais?.borders);
          this.fronteras = pais?.borders;
        })
      
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
