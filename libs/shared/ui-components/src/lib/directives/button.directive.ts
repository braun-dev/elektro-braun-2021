import { Directive, HostBinding, Input, OnInit } from '@angular/core';

const COMP_PREFIX = 'eb-button';

@Directive({
  selector: '[ebButton], button[ebButton], a[ebButton]',
})
export class ButtonDirective implements OnInit {

  private appliedClasses: string[] = [];

  private _size: 's' | 'm' | 'l' = 'm';
  private _textColor: 'light' | 'dark' = 'light'
  private _roundness: 's' | 'm' | 'l' | 'xl' = 'm';
  private _variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  @Input()
  get variant() { return this._variant; }
  set variant(value: 'primary' | 'secondary' | 'ghost') {
    if (this.appliedClasses.includes(value) || this._variant === value) { return; }
    this._variant = value;
    this.updateClasses();
  }

  @Input()
  get roundness() { return this._roundness; }
  set roundness(value: 's' | 'm' | 'l' | 'xl') {
    if (this.appliedClasses.includes(value) || this._roundness === value) { return; }
    this._roundness = value;
    this.updateClasses();
  }

  @Input()
  get textColor() { return this._textColor; }
  set textColor(value: 'light' | 'dark') {
    if (this.appliedClasses.includes(value) || this._textColor === value) { return; }
    this._textColor = value;
    this.updateClasses();
  }

  @Input()
  get size() { return this._size; }
  set size(value: 's' | 'm' | 'l') {
    if (this.appliedClasses.includes(value) || this._size === value) { return; }
    this._size = value;
    this.updateClasses();
  }

  @HostBinding('class')
  get activeClasses() {
    return this.appliedClasses.join(' ');
  }

  ngOnInit(): void {
    this.updateClasses();
  }

  private updateClasses(): void {
    this.appliedClasses = [
      this.variantClass,
      this.roundnessClass,
      this.textColorClass,
      this.sizeClass,
    ];
  }

  get variantClass(): string {
    return `${COMP_PREFIX}-${this._variant}`;
  }

  get roundnessClass(): string {
    return `${COMP_PREFIX}--round-${this._roundness}`;
  }

  get textColorClass(): string {
    return this._variant !== 'ghost' ? `${COMP_PREFIX}--text-${this._textColor}` : '';
  }

  get sizeClass(): string {
    return `${COMP_PREFIX}--${this._size}`;
  }
}
