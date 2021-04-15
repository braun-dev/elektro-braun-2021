import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ebFormGroup]'
})
export class FormGroupDirective {
  constructor(readonly template: TemplateRef<HTMLElement>){ }
}
