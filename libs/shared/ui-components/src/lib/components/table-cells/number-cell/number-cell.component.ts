import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'eb-number-cell',
  template: `<span [ngClass]='class'>{{ value | number: '1.2-2' }}</span>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCellComponent {
  @Input() value: number | null = null;
  @Input() class = '';
}
