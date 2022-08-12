import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { ApiService } from '../Core/_providers/api-service/api.service';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
    @Output('onClickOutside') onClickOutside = new EventEmitter<MouseEvent>();

  constructor(private _eref: ElementRef,private apiSrvc : ApiService) {}

  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClicked(event: MouseEvent, targetElement: HTMLElement) {
  alert("enter")
    if (targetElement && document.body.contains(targetElement) && !this._eref.nativeElement.contains(targetElement)) {
   
      this.onClickOutside.emit(event);
      }
    }
}
