import { FailImageDirective } from './fail-image.directive';
import { ElementRef } from '@angular/core';

describe('FailImageDirective', () => {
  it('should create an instance', () => {
    // We create a mock of the ElementRef object
    const elementRefMock = new ElementRef(document.createElement('img'));

    // We give the mock to the directive
    const directive = new FailImageDirective(elementRefMock);

    expect(directive).toBeTruthy();
  });
});

