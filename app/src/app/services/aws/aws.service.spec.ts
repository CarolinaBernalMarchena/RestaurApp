import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'

import { AwsService } from './aws.service';
import { HttpParams, provideHttpClient } from '@angular/common/http';

describe('AwsService', () => {
  let service: AwsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AwsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request', () => {
    const params =  new HttpParams().set('key', 'value');
    const endpoint = 'https://api.example.com/data';

    service.get(endpoint, { params }).subscribe(response => expect(response).toBeTruthy());

    // Expecting one HTTP request to the specific URL
    const req = httpMock.expectOne(endpoint + '?key=value');

    // Verify the requested method is GET
    expect(req.request.method).toBe('GET');

    // Verify the request params
    expect(req.request.params.get('key')).toBe('value');

    // Simulate a response from the server
    req.flush({ data: 'test' });
  })

  it('should make a POST request', () => {
    const params = new HttpParams().set('key', 'value');
    const body = { name: 'test' }
    const endpoint = 'https://api.example.com/data';

    service.post(endpoint, body, { params }).subscribe(response => expect(response).toBeTruthy());

    const req = httpMock.expectOne(endpoint + '?key=value');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    expect (req.request.params.get('key')).toBe('value');
    req.flush({ data: 'test' });
  })

  it('should make a PUT request', () => {
    const params = new HttpParams().set('key', 'value');
    const body = { name: 'test' }
    const endpoint = 'https://api.example.com/data';

    service.put(endpoint, body, { params }).subscribe(response => expect(response).toBeTruthy());

    const req = httpMock.expectOne(endpoint + '?key=value');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    expect (req.request.params.get('key')).toBe('value');
    req.flush({ data: 'test' });
  })

  it('should make a DELETE request', () => {
    const params = new HttpParams().set('key', 'value');
    const endpoint = 'https://api.example.com/data';

    service.delete(endpoint, { params }).subscribe(response => expect(response).toBeTruthy());

    const req = httpMock.expectOne(endpoint + '?key=value');
    expect(req.request.method).toBe('DELETE');
    expect (req.request.params.get('key')).toBe('value');
    req.flush({ data: 'test' });
  })
});
