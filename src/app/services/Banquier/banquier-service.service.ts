import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';



export interface Banquier {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  agence: string;
}


@Injectable({
  providedIn: 'root'
})
export class BanquierServiceService {

  private api = environment.apiUrl + '/banquier';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Banquier[]> {
    return this.http.get<Banquier[]>(this.api, { withCredentials: true });
  }
  create(dto: Omit<Banquier, 'id'>): Observable<any> {
  return this.http.post(this.api + '/add', dto, { withCredentials: true });
}
delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.api}/delete/${id}`, { withCredentials: true });
}
update(id: number, dto: Omit<Banquier, 'id'>): Observable<any> {
  return this.http.put(`${this.api}/update/${id}`, dto, { withCredentials: true });
}

}
