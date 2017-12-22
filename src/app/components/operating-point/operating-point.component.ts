import {Component, Input, OnInit} from '@angular/core';
import { OperatingPointService } from "../../services/operating-point/operating-point.service";

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  fanOne = {
    name: 'Some Name',
    description: 'Description',
    image: 'assets/images/fan.png'
  }
  feature = [];

  constructor(private operatingPointService: OperatingPointService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.operatingPointService.getItems().subscribe((response: any) => {
      this.feature = response;
    });
  }

}
