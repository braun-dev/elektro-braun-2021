import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'eb-number-cell',
  templateUrl: './number-cell.component.html',
  styleUrls: ['./number-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
