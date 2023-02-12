import { TestBed } from '@angular/core/testing';

import { JoborderManagementService } from './joborder-management.service';

describe('JoborderManagementService', () => {
  let service: JoborderManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoborderManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
