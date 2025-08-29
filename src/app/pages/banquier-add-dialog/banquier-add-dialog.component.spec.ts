import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquierAddDialogComponent } from './banquier-add-dialog.component';

describe('BanquierAddDialogComponent', () => {
  let component: BanquierAddDialogComponent;
  let fixture: ComponentFixture<BanquierAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanquierAddDialogComponent]
    });
    fixture = TestBed.createComponent(BanquierAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
