import { TestBed } from '@angular/core/testing';

import { SubscriptionMagementService } from './subscription-magement.service';

describe('SubscriptionMagementService', () => {
  let service: SubscriptionMagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionMagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
