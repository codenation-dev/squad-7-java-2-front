import { TestBed } from '@angular/core/testing';

import { HttpDatabaseService } from './http-database.service';

describe('HttpDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpDatabaseService = TestBed.get(HttpDatabaseService);
    expect(service).toBeTruthy();
  });
});
