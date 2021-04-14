import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'eb-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
