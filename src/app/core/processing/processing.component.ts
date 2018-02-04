import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'itcusco-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent implements OnInit {

  @Input() showProcessing: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
