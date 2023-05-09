import { Directive, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: 'loadCaller'
})
export class EditModalDirective{
  constructor(){
    setTimeout(()=>{
      this.callback.emit()
    }, 1)
  }

  @Output('callback') callback = new EventEmitter();
}
