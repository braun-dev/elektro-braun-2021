import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'elektro-braun-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
