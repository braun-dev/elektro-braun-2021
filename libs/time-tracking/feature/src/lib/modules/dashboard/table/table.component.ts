import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'elektro-braun-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
