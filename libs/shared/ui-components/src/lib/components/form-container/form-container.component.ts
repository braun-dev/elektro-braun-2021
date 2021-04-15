import { Component, OnInit, ChangeDetectionStrategy, ContentChild, TemplateRef, Input } from '@angular/core';
import { FormHeaderDirective } from './directives/form-header.directive';
import { FormGroupDirective } from './directives/form-group.directive';

@Component({
  selector: 'eb-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {

  @Input() stacked = true;

  @ContentChild(FormHeaderDirective, { read: TemplateRef })
  readonly formHeaderTemplate: TemplateRef<HTMLElement>;

  @ContentChild(FormGroupDirective, { read: TemplateRef })
  readonly formGroupTemplate: TemplateRef<HTMLElement>;

  ngOnInit(): void {
    return;
  }
}
