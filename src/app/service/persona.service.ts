import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  BASE_URL: string;
  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/persona`;
    console.log(this.BASE_URL);
  }

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
