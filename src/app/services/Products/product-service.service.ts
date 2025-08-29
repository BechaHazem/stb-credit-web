import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

export interface Product {
  id: number;
  code: string;
  description: string;
  rate: number;
  minimumAmount: number;
  maximumAmount: number;
  minimumTerm: number;
  maximumTerm: number;
  minimumAge: number;
  maximumAge: number;
  minimumDeferredPeriod: number;
  maximumDeferredPeriod: number;
  issueFeeAmount1: number;
}

export interface ProductRequest {
  code: string;
  description: string;
  rate: number;
  minimumAmount: number;
  maximumAmount: number;
  minimumTerm: number;
  maximumTerm: number;
  minimumAge: number;
  maximumAge: number;
  minimumDeferredPeriod: number;
  maximumDeferredPeriod: number;
  issueFeeAmount1: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private api = environment.apiUrl + '/api/products';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api,{ withCredentials: true });
  }
  create(dto: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.api+'/create', dto,{ withCredentials: true });
  }
  update(id: number, dto: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, dto,{ withCredentials: true });
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`,{ withCredentials: true });
  }
}
