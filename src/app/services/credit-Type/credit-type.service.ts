import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { creditType } from 'src/app/entities/Credit-Type.entity';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditTypeService {
  private apiUrl = environment.apiUrl + '/api/credit-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<creditType[]> {
    return this.http.get<creditType[]>(this.apiUrl);
  }

  getById(id: number): Observable<creditType> {
    return this.http.get<creditType>(`${this.apiUrl}/${id}`);
  }

  create(type: Omit<creditType, 'id'>): Observable<creditType> {
    return this.http.post<creditType>(this.apiUrl, type);
  }

  update(id: number, type: Omit<creditType, 'id'>): Observable<creditType> {
    return this.http.put<creditType>(`${this.apiUrl}/${id}`, type);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}