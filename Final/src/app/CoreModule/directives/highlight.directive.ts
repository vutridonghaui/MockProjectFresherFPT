import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }
  @HostListener('click',['$event.target']) onClick(){
      this.backandforeground("#146adb");
  }
  private backandforeground(color:string){
    let current=this.el.nativeElement;
    while(current.tagName!=="LI"){
      current=current.parentNode; 
    }
    // let prevSibling = current.previousElementSibling;
    // let nextSibling = current.nextElementSibling;

    // while(nextSibling) {
    //   nextSibling.style.backgroundColor='none';
    //   nextSibling = nextSibling.nextElementSibling;
    // }

    // while(prevSibling) {
    //   prevSibling.style.backgroundColor='none';
    //   prevSibling = prevSibling.previousElementSibling;
    // }  
    // this.el.nativeElement.style.backgroundColor=color;
    current.style.backgroundColor=color;
  }

}
