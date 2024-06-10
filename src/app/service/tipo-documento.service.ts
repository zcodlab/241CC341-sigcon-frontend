import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../model/tipo-documento';
import { getConexionBackend } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  BASE_URL: string;
  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/tipodocumento`;
    console.log(this.BASE_URL);
  }

  getTipoDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.BASE_URL}/listar`);
  }
}
