import { TestBed } from '@angular/core/testing';

import { InvoiceManagementServiceService } from './invoice-management-service.service';

describe('InvoiceManagementServiceService', () => {
  let service: InvoiceManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
