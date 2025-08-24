import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationsHistoryComponent } from './simulations-history.component';

describe('SimulationsHistoryComponent', () => {
  let component: SimulationsHistoryComponent;
  let fixture: ComponentFixture<SimulationsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulationsHistoryComponent]
    });
    fixture = TestBed.createComponent(SimulationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
