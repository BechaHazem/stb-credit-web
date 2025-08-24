import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansRequestComponent } from './loans-request.component';

describe('LoansRequestComponent', () => {
  let component: LoansRequestComponent;
  let fixture: ComponentFixture<LoansRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoansRequestComponent]
    });
    fixture = TestBed.createComponent(LoansRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
