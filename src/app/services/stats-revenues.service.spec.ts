import { TestBed } from '@angular/core/testing';

import { StatsRevenuesService } from './stats-revenues.service';

describe('StatsRevenuesService', () => {
  let service: StatsRevenuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsRevenuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
