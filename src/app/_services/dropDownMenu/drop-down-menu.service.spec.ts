import { TestBed } from '@angular/core/testing';

import { DropDownMenuService } from './drop-down-menu.service';

describe('DropDownMenuService', () => {
  let service: DropDownMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
