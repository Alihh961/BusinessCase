import { TestBed } from '@angular/core/testing';

import { EthvaluesService } from './ethvalues.service';

describe('EthvaluesService', () => {
  let service: EthvaluesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EthvaluesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
