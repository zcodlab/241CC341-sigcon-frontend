import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  readonly BASE_URL = 'http://localhost:8080/api/v1/persona';
  constructor(private http: HttpClient) {}

  getPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.BASE_URL}/listar`);
  }
  registrarPersona(form: any) {
    return this.http.post(`${this.BASE_URL}/insert`, form);
  }

  actualizarPersona(form: any) {
    return this.http.post(`${this.BASE_URL}/update`, form);
  }

  eliminarPersona(persona: Persona) {
    return this.http.delete(`${this.BASE_URL}/delete`, { body: persona });
  }
}
