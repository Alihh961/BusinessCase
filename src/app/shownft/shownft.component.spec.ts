import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownftComponent } from './shownft.component';

describe('ShownftComponent', () => {
  let component: ShownftComponent;
  let fixture: ComponentFixture<ShownftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShownftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShownftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
