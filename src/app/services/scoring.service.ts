// scoring.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanRequest } from '../entities/loan-request.entity';
import { environment } from 'src/environment';

@Injectable({ providedIn: 'root' })
export class ScoringService {
    
private readonly api = environment.apiUrl + '/credit/api/scoring';
    

  constructor(private http: HttpClient) {}

  calculateCustomerScore(loan: LoanRequest): Observable<{ score: number; riskLabel: string; riskColor: string }> {
    return this.http.post<{ score: number; riskLabel: string; riskColor: string }>(
      `${this.api}/calculate_customer_score`,
      loan
    );
  }
}