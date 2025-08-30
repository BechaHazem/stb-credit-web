import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Document } from '../entities/document.entity';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly baseUrl = environment.apiUrl + '/credit/api/documents';

  constructor(private http: HttpClient) {}

    findByLoanAndCustomer(doc : Document): Observable<Document[]> {
    return this.http.post<Document[]>(`${this.baseUrl}` , doc);
  }
}
