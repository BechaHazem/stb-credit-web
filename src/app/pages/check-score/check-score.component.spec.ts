import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckScoreComponent } from './check-score.component';

describe('CheckScoreComponent', () => {
  let component: CheckScoreComponent;
  let fixture: ComponentFixture<CheckScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckScoreComponent]
    });
    fixture = TestBed.createComponent(CheckScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
