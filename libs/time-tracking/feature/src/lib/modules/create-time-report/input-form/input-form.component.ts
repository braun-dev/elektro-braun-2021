import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'elektro-braun-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
