import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'elektro-braun-skeleton-table-row',
  templateUrl: './skeleton-table-row.component.html',
  styleUrls: ['./skeleton-table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonTableRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
