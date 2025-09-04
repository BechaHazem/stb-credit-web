import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanRequest } from '../entities/loan-request.entity';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  private apiUrl = environment.apiUrl + '/credit/api/loan-requests'

  constructor(private http: HttpClient) {}

  /**
   * Create a new loan request
   */
  createLoanRequest(payload: LoanRequest): Observable<LoanRequest> {
    return this.http.post<LoanRequest>(this.apiUrl + '/' , payload);
  }

  /**
   * Fetch all loan requests (optional, can be useful later)
   */
  getLoanRequests(): Observable<LoanRequest[]> {
    return this.http.get<LoanRequest[]>(this.apiUrl);
  }

  /**
   * Fetch loan request by ID
   */
  getLoanRequestById(id: number): Observable<LoanRequest> {
    return this.http.get<LoanRequest>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update loan request (useful for changing step later)
   */
  updateLoanRequest(id: number, payload: Partial<LoanRequest>): Observable<LoanRequest> {
    return this.http.put<LoanRequest>(`${this.apiUrl}/update/${id}`, payload);
  }
    getLoanRequestsByCustomer(customerId: number): Observable<LoanRequest[]> {
    return this.http.get<LoanRequest[]>(`${this.apiUrl}/customer/${customerId}`);
  }
      getLoanRequestsAgence(agence: string): Observable<LoanRequest[]> {
    return this.http.get<LoanRequest[]>(`${this.apiUrl}/banker/${agence}`);
  }
  update(loan: LoanRequest): Observable<LoanRequest> {
    return this.http.put<LoanRequest>(`${this.apiUrl}`,loan);
  }
}
