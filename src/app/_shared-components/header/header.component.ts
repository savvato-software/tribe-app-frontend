import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})


export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() public currentPageTitle: string = "";
  @Input() public primaryActionButtonLabel: string = "";
  @Input() public primaryActionButtonFunc: () => void;
  
  ngOnInit() {}

  onPrimaryActionButtonClick() {
    this.primaryActionButtonFunc();
  }

}
