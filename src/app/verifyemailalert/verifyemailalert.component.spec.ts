import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyemailalertComponent } from './verifyemailalert.component';

describe('VerifyemailalertComponent', () => {
  let component: VerifyemailalertComponent;
  let fixture: ComponentFixture<VerifyemailalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyemailalertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyemailalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
