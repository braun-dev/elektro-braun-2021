import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Input,
  Output, TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectAppearanceConfig } from './select-appearance-config';

@Component({
  selector: 'eb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent<T extends { id: string | number; label: string }> implements ControlValueAccessor {

  @ViewChild('ebSelectControl', { static: true, read: ElementRef }) private selectControl: ElementRef | null = null;

  readonly isOpen$ = new BehaviorSubject<boolean>(false);
  readonly highlighted$ = new BehaviorSubject<T | null>(null);

  private _selectedItem: T | null = null;
  private _selectedClasses: string[] = [];

  @Input() placeholder = 'Auswählen';
  @Input() options: T[] = [];
  @Input() disabled = false;
  @Input() labelKey = 'label'
  @Input() valueTemplate: TemplateRef<any> | null = null;
  @Input() optionTemplate: TemplateRef<any> | null = null;
  @Input() closeAfterEnterSelection = true;
  @Input() appearance: SelectAppearanceConfig = {} // TODO

  @Input()
  set focusTrigger(_: never) {
    if (!this.selectControl) { return; }
    this.selectControl.nativeElement.focus();
    console.log('select focus trigger')
  }

  @Input()
  set selectedClasses(classes: string[]) {
    this._selectedClasses = classes;
  }

  @Input()
  get selected() { return this._selectedItem; }
  set selected(value: T | null) {
    if (this._selectedItem === value || this.disabled) { return; }

    if (!value) {
      this.onChange(null);
      return;
    }

    this._selectedItem = value;
    this.onChange(this._selectedItem);
    this.selectionChanged.emit(this._selectedItem);
  }

  @Output() selectionChanged = new EventEmitter<T>();

  get selectedClassesString() {
    return this._selectedClasses.join(' ');
  }

  select(item: T | null): void {
    this.selected = item;
    this.selectControl?.nativeElement?.focus();
  }

  selectHighlighted(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const highlighted = this.highlighted$.getValue();
    if (highlighted === this._selectedItem || this.disabled) { return; }
    this.selected = this.highlighted$.getValue();
    if (this.closeAfterEnterSelection) {
      this.isOpen$.next(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen$.next(!this.isOpen$.value);
    if (!this.isOpen$.value) {
      this.selectControl?.nativeElement?.focus();
    }
  }

  highlightNextItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.options || this.options.length < 1) {
      return;
    }

    const currentlyHighlightedOption = this.highlighted$.value;
    const optionCount = this.options.length;
    const index = this.options.indexOf(currentlyHighlightedOption)

    if (!currentlyHighlightedOption || index === optionCount - 1) {
      this.highlighted$.next(this.options[0]);
      return;
    }

    if (index === -1) {
      return;
    }

    this.highlighted$.next(this.options[index + 1]);
  }

  highlightPreviousItem(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.options || this.options.length < 1) {
      return;
    }

    const currentlyHighlightedOption = this.highlighted$.value;
    const optionCount = this.options.length;
    const index = this.options.indexOf(currentlyHighlightedOption)

    if (!currentlyHighlightedOption || index === 0) {
      this.highlighted$.next(this.options[optionCount - 1]);
      return;
    }

    if (index === -1) {
      return;
    }

    this.highlighted$.next(this.options[index - 1]);
  }

  // === Control Value Accessor Interface ===
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: T | null) => { /*EMPTY*/ };
  onTouched = () => { /*EMPTY*/ };

  writeValue(value: T): void {
    if (value === this._selectedItem || this.disabled) { return; }
    this._selectedItem = value ?? null;
    this.selectionChanged.emit(value ?? null);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}
