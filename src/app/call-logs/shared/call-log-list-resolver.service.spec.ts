import { TestBed } from '@angular/core/testing';

import { CallLogListResolverService } from './call-log-list-resolver.service';

describe('CallLogListResolverService', () => {
  let service: CallLogListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallLogListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
