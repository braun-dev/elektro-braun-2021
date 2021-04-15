import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[ebSkeletonTableRow]',
  templateUrl: './skeleton-table-row.component.html',
  styleUrls: ['./skeleton-table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonTableRowComponent {}
