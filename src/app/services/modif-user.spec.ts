import { TestBed } from '@angular/core/testing';

import { ModifUserService } from './modif-user.service';

describe('ModifUserService', () => {
  let service: ModifUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
