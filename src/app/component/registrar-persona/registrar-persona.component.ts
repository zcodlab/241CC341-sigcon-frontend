import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Persona } from '../../model/persona';
import { PersonaService } from './../../service/persona.service';
import Swal from 'sweetalert2';
import { CommonModule, formatDate } from '@angular/common';
import { TipoDocumento } from '../../model/tipo-documento';
import { TipoDocumentoService } from '../../service/tipo-documento.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  personaArray: Persona[] = [];
  tipodocumentoArray: TipoDocumento[] = [];
  personaForm: FormGroup;
  offset: number;
  page: number = 1;
  isEdited: boolean = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private personaService: PersonaService,
    private tipoDocumentoService: TipoDocumentoService
  ) {
    this.offset = new Date().getTimezoneOffset();
    this.personaForm = new FormGroup({
      id_persona: new FormControl('', []),
      apellido_paterno: new FormControl('', []),
      apellido_materno: new FormControl('', []),
      nombres: new FormControl('', []),
      fecha_nacimiento: new FormControl('', []),
      id_tipo_documento: new FormControl('1', []),
    });
  }
  ngOnInit(): void {
    this.personaForm.reset();
    this.isEdited = false;
    this.getPersonas();
    this.getTipoDocumentos();
    this.personaForm.controls['id_tipo_documento'].setValue(1);
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

  getTipoDocumentos(): void {
    this.tipoDocumentoService.getTipoDocumentos().subscribe(
      (result: any) => {
        this.tipodocumentoArray = result;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!...',
          text: '!Ah ocurrido un error-tipodocumento!',
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
    if (this.isEdited) {
      this.actualizarPersona();
    } else {
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
  }
  seleccionarTipoDocumento(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    this.personaForm.controls['id_tipo_documento'].setValue(inputChangeValue);
  }

  actualizarPersona(): void {
    this.personaService.actualizarPersona(this.personaForm.value).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'actualizarPersona!...',
          text: '!Se actualizó exitosamente los datos de la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia!...',
          text: '!Ah ocurrido un error al actualizar persona!',
        });
      }
    );
  }

  editarPersona(persona: Persona): void {
    this.personaForm.setValue({
      id_persona: persona.id_persona,
      apellido_paterno: persona.apellido_paterno,
      apellido_materno: persona.apellido_materno,
      nombres: persona.nombres,
      fecha_nacimiento: formatDate(
        persona.fecha_nacimiento,
        'yyyy-MM-dd',
        this.locale,
        'UTC' + this.offset
      ),
      id_tipo_documento: persona.id_tipo_documento,
    });
    this.isEdited = true;
  }
}
