import { TestBed } from '@angular/core/testing';

import { ManageHistoryService } from './manage-history-service.service';

describe('ManageHistoryServiceService', () => {
  let service: ManageHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
