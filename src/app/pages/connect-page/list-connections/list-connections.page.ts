import { Component, OnInit } from '@angular/core';
import {ConnectModelService} from "../_services/connect.model.service";

@Component({
  selector: 'app-list-connections',
  templateUrl: './list-connections.page.html',
  styleUrls: ['./list-connections.page.scss'],
})
export class ListConnectionsPage implements OnInit {

  constructor(private _connectModelService: ConnectModelService) { }

  ngOnInit() {
    this._connectModelService.init();
  }

  getAllConnections() {
    return this._connectModelService.getAllConnections()
  }

}
