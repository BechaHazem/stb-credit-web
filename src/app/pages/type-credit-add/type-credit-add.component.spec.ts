import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreditAddComponent } from './type-credit-add.component';

describe('TypeCreditAddComponent', () => {
  let component: TypeCreditAddComponent;
  let fixture: ComponentFixture<TypeCreditAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeCreditAddComponent]
    });
    fixture = TestBed.createComponent(TypeCreditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
