import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Promise } from 'q';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  forma: FormGroup;
  usuario: any = {
      nombre: 'Cristian',
      apellido: 'Gonzalez',
      correo: 'cristiangt9@gmail.com'
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
  constructor() {
    const controls = this.paises.map(c => new FormControl(false));
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'correo': new FormControl('', [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      'pasatiempos': new FormArray([
        new FormControl('')
      ]),
      'paises': new FormControl('', Validators.required),
      'paises2': new FormControl('', Validators.required),
      'paises3': new FormArray(controls),
      'nickname': new FormControl('', Validators.required, this.existeNickname ),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(''),
    });
    // this.forma.setValue( this.usuario );
    this.forma.controls['password2'].setValidators([Validators.required, this.noIgual.bind( this.forma )]);
    console.log(this.forma);
    this.forma.controls['apellido'].valueChanges.subscribe( data => console.log(data));
    this.forma.controls['apellido'].statusChanges.subscribe(data => console.log(data));
    )
  }

  ngOnInit() {
  }
  guardarCambios() {
    const selectedPaisesIds = this.forma.value.paises3
      .map((v, i) => v ? this.paises[i].codigo : null)
      .filter(v => v !== null);
    console.log(this.forma);
    console.log(selectedPaisesIds);
    
    // this.forma.reset( this.usuario );
  }
  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('')
    );
  }
  noIgual( control: FormControl ): {[s: string]: boolean} {
    const forma: any = this;
    if ( control.value !== forma.controls['password1'].value ) {
      return {
        noigual: true
      };
    }
    return null;
  }

  existeNickname( control: FormControl): Promise<any>|Observable<any>{
    let promesa = Promise( (resolve, rejec ) =>{
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve( { existe: true });
        } else {
          resolve( null  );
        }
      }, 3000);
    } );
    return promesa;
  }
}
