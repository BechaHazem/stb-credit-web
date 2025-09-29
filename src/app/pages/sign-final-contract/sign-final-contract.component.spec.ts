import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFinalContractComponent } from './sign-final-contract.component';

describe('SignFinalContractComponent', () => {
  let component: SignFinalContractComponent;
  let fixture: ComponentFixture<SignFinalContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignFinalContractComponent]
    });
    fixture = TestBed.createComponent(SignFinalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
