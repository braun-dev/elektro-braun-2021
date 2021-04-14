import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'eb-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableInputComponent {

  @Input() formGroup: FormGroup | null = null;
  @Input() controlName: string;
  @Input() placeholder = '';

  @Input()
  set triggerFocus(_: void | null | unknown | undefined) {
    if (!this.element) { return }
    this.element.nativeElement.focus();
    console.log('focusing input')
  }

  @ViewChild('inputControl', { static: true, read: ElementRef }) private element: ElementRef<HTMLElement> | null = null;

  @Output() blurred = new EventEmitter<string>()

  constructor() {}
}
