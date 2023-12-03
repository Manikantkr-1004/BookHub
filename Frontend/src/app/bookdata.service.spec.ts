import { TestBed } from '@angular/core/testing';

import { BookdataService } from './bookdata.service';

describe('BookdataService', () => {
  let service: BookdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
