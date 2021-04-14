import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'eb-date-cell',
  template: `
    <div class="ml-4 w-full">
      <div class="text-base w-full font-medium text-gray-800">
        {{ value ? (value | date: 'EEEE') : '' }}
      </div>
      <div class="text-sm text-gray-500 font-light">
        {{ value ? (value | date: 'dd.MM.yyyy') : '' }}
      </div>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateCellComponent implements OnInit {

  @Input() value: string | Date;

  constructor() { }

  ngOnInit(): void {
  }

}
