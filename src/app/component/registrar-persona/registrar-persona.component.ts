import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Persona } from '../../model/persona';
import { PersonaService } from './../../service/persona.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  personaArray: Persona[] = [];
  personaForm: FormGroup;
  offset: number;

  constructor(private personaService: PersonaService) {
    this.offset = new Date().getTimezoneOffset();
    this.personaForm = new FormGroup({
      apellido_paterno: new FormControl('', []),
      apellido_materno: new FormControl('', []),
      nombres: new FormControl('', []),
      fecha_nacimiento: new FormControl('', []),
    });
  }
  ngOnInit(): void {
    this.personaForm.reset();
    this.getPersonas();
  }
  getPersonas(): void {
    this.personaService.getPersona().subscribe(
      (result: any) => {
        this.personaArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!...',
          text: '!Ah ocurrido un error!',
        });
      }
    );
  }

  eliminarPersona(persona: Persona): void {
    this.personaService.eliminarPersona(persona).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'eliminarPersona!...',
          text: '!Se elimino exitosamente los datos de la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!...',
          text: '!Ah ocurrido un error al eliminar persona!',
        });
      }
    );
  }

  registrarPersona(): void {
    this.personaService.registrarPersona(this.personaForm.value).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'registrarPersona!...',
          text: '!Se registro exitosamente los datos de la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!...',
          text: '!Ah ocurrido un error al registrar persona!',
        });
      }
    );
  }

  editarPersona(persona: Persona): void {
    Swal.close();
    Swal.fire({
      icon: 'warning',
      title: 'editarPersona!...',
      text: '!Falta implementar esta funcionalidad!',
    });
  }
}
