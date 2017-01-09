/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReittiopasService } from './reittiopas.service';

describe('ReittiopasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReittiopasService]
    });
  });

  it('should ...', inject([ReittiopasService], (service: ReittiopasService) => {
    expect(service).toBeTruthy();
  }));
});
