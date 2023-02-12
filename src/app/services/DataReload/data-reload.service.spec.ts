import { TestBed } from '@angular/core/testing';

import { DataReloadService } from './data-reload.service';

describe('DataReloadService', () => {
  let service: DataReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
