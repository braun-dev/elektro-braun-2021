import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'eb-difference-cell',
  template: `
    <ng-container *ngIf='(totalHours - regularHours) > 0'>
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        +{{ (totalHours - regularHours) | number: '1.2-2' }}
      </span>
    </ng-container>
    <ng-container *ngIf='(totalHours - regularHours) < 0'>
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        {{ (totalHours - regularHours) | number: '1.2-2' }}
      </span>
    </ng-container>
    <ng-container *ngIf='(totalHours - regularHours) === 0'>
      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
        {{ (totalHours - regularHours) | number: '1.2-2' }}
      </span>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DifferenceCellComponent {
  @Input() totalHours: number | null = null;
  @Input() regularHours: number | null = null;
}
