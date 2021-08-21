import { TestBed } from '@angular/core/testing';

import { CallLogDetailsResolverService } from './call-log-details-resolver.service';

describe('CallLogDetailsResolverService', () => {
  let service: CallLogDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallLogDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
