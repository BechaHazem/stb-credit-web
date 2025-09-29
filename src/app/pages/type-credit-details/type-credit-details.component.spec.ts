import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreditDetailsComponent } from './type-credit-details.component';

describe('TypeCreditDetailsComponent', () => {
  let component: TypeCreditDetailsComponent;
  let fixture: ComponentFixture<TypeCreditDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeCreditDetailsComponent]
    });
    fixture = TestBed.createComponent(TypeCreditDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
