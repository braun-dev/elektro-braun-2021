import { ChangeDetectionStrategy, Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'eb-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableInputComponent {

  private _readonly = true;

  @ViewChild('inputControl', { static: false, read: ElementRef }) readonly element: ElementRef<HTMLElement> | null = null;

  @Input() readonly formGroup: FormGroup | null = null;
  @Input() readonly controlName: string;
  @Input() readonly placeholder = '';
  @Input() readonly placeholderType: 'number' | 'string' = 'number';
  @Input() readonly type: 'normal' | 'date' = 'normal';
  @Input()
  get readonly() { return this._readonly; }
  set readonly(value: boolean) {
    if (this._readonly !== value) {
      this._readonly = value;
    }
  }

  @Input()
  set triggerFocus(value: boolean) {
    if (this.element && value) {
      this.element.nativeElement.focus()
    }
  }

  @Output() readonly nextDate = new EventEmitter<void>();
  @Output() readonly prevDate = new EventEmitter<void>();

  checkIfCanFocus($event: Event): void {
    if (!this._readonly) {
      return;
    }

    $event?.preventDefault();
    $event.stopPropagation();
    this.element?.nativeElement?.blur();
  }
}
