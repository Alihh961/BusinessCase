import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthchartComponent } from './ethchart.component';

describe('EthchartComponent', () => {
  let component: EthchartComponent;
  let fixture: ComponentFixture<EthchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EthchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
