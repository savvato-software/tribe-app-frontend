import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})


export class HeaderComponent implements OnInit {

  constructor() { }
  
  @Input() public currentPageTitle: string = "";

  @Input() public displayPrimaryActionButton = false;
  @Input() public primaryActionButtonText: string = "";
  @Input() public primaryActionButtonFunc: () => void;

  @Input() public displaySecondaryActionButton = false;
  @Input() public secondaryActionButtonText: string = "";
  @Input() public secondaryActionButtonFunc: () => void;

  ngOnInit() {}

  onPrimaryActionButtonClick() {
    this.primaryActionButtonFunc();
  }

  onSecondaryActionButtonClick() {
    this.secondaryActionButtonFunc();
  }

}
