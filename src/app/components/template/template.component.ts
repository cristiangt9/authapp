import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  
  usuario = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    genero: 'Hombre',
    acepta: false
  };

  paises = [{
    codigo: 'VEN',
    nombre: 'Venezuela'
  },
  {
    codigo: 'COL',
    nombre: 'Colombia'
  },
  {
    codigo: 'BRA',
    nombre: 'Brasil'
  }];

  generos: string[] = ['Hombre', 'Mujer', 'No Definido'];
  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm ) {
    console.log('form enviado');
    console.log(forma);
    console.log(forma.value);
    console.log( this.usuario );
  }
}
