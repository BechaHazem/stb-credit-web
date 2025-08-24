import { TestBed } from '@angular/core/testing';

import { BanquierServiceService } from '../Banquier/banquier-service.service';

describe('BanquierServiceService', () => {
  let service: BanquierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanquierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
