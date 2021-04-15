import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ebFormHeader]'
})
export class FormHeaderDirective {
  constructor(readonly template: TemplateRef<HTMLElement>){ }
}
