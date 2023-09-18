import { TestBed } from '@angular/core/testing';

import { TogglebodyclassService } from './togglebodyclass.service';

describe('TogglebodyclassService', () => {
  let service: TogglebodyclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglebodyclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
