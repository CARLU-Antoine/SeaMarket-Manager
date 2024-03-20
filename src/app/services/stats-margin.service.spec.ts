import { TestBed } from '@angular/core/testing';

import { StatsMarginService } from './stats-margin.service';

describe('StatsMarginService', () => {
  let service: StatsMarginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsMarginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
