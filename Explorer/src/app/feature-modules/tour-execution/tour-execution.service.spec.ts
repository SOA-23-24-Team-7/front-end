import { TestBed } from '@angular/core/testing';

import { TourExecutionService } from './tour-execution.service';

describe('TourExecutionServiceService', () => {
  let service: TourExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
