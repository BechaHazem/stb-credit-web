import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Signature } from 'src/app/entities/signature.entity';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SignatureServiceService {

  private Signature_api = environment.apiUrl + '/api/signatures';
    private Attach_api = environment.apiUrl + '/api/loan-requests';

  constructor(private http: HttpClient) {}

    /**
   * Upload a signature image to the backend (multipart/form-data)
   */
  uploadSignature(file: File): Observable<Signature> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Signature>(
      `${this.Signature_api}/upload`,
      formData,{ withCredentials: true }
    );
  }

    /**
   * Attach a signature to a Loan Request (by ID + signatureUrl)
   */
  attachSignature(loanRequestId: number, signatureUrl: string): Observable<void> {
    const params = { signatureUrl: signatureUrl };
    return this.http.post<void>(
      `${this.Attach_api}/${loanRequestId}/attach-signature`,
      null,
      { params ,withCredentials: true},
    );
  }
  getMySignature(): Observable<Signature | null> {
  return this.http.get<Signature>(`${this.Signature_api}/me`, { withCredentials: true })
    .pipe(
      catchError(() => of(null))   // return null when 204 No-Content
    );
}


}
