import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquierDetailsComponent } from './banquier-details.component';

describe('BanquierDetailsComponent', () => {
  let component: BanquierDetailsComponent;
  let fixture: ComponentFixture<BanquierDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanquierDetailsComponent]
    });
    fixture = TestBed.createComponent(BanquierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
