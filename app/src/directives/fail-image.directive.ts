import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appFailImage]',
  standalone: true,
})
export class FailImageDirective {

  @Input() failImage: string = 'https://i.imgur.com/4W4JMA3.png';

  constructor(private element: ElementRef) { }

  @HostListener('error') onError() {
    const element: HTMLImageElement = this.element.nativeElement;

    // Original image dimensions
    const originalWidth = element.clientWidth;
    const originalHeight = element.clientHeight;

    element.src = this.failImage;

    // Set original dimensions to the fallback image
    element.style.width = `${originalWidth}px`;
    element.style.height = `${originalHeight}px`;
  }

}
