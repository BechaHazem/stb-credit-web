import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreditSimulationRequest,
  CreditSimulationResponse,
} from '../entities/credit-simulation.entity';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  private readonly baseUrl = environment.apiUrl + '/credit/api';

  constructor(private http: HttpClient) {}

  simulate(
    request: CreditSimulationRequest
  ): Observable<CreditSimulationResponse> {
    return this.http.post<CreditSimulationResponse>(
      `${this.baseUrl}/simulator`,
      request
    );
  }
  /* 2. Persist a brand-new simulation for a customer */
  saveSimulation(
    customerId: number,
    dto: CreditSimulationResponse
  ): Observable<CreditSimulationResponse> {
    return this.http.post<CreditSimulationResponse>(
      `${this.baseUrl}/${customerId}`,
      dto
    );
  }

  /* 3. Update an existing simulation */
  updateSimulation(
    id: number,
    dto: CreditSimulationResponse
  ): Observable<CreditSimulationResponse> {
    return this.http.put<CreditSimulationResponse>(
      `${this.baseUrl}/${id}`,
      dto
    );
  }

  /* 4. List all simulations for a customer */
  getCustomerSimulations(
    customerId: number
  ): Observable<CreditSimulationResponse[]> {
    return this.http.get<CreditSimulationResponse[]>(
      `${this.baseUrl}/${customerId}`
    );
  }
}
