import { TestBed } from '@angular/core/testing';

import { ContractManagementService } from './contract-management.service';

describe('ContractManagementService', () => {
  let service: ContractManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
