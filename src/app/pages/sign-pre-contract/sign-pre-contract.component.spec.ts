import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPreContractComponent } from './sign-pre-contract.component';

describe('SignPreContractComponent', () => {
  let component: SignPreContractComponent;
  let fixture: ComponentFixture<SignPreContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignPreContractComponent]
    });
    fixture = TestBed.createComponent(SignPreContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
