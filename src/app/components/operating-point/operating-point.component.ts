import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OperatingPointService } from '../../services/operating-point/operating-point.service';
import * as _ from 'lodash';
import {MyProjectsService} from '../../services/my-projects/my-projects.service';
import {CustomNotificationsService} from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-operating-point',
  templateUrl: './operating-point.component.html',
  styleUrls: ['./operating-point.component.scss']
})
export class OperatingPointComponent implements OnInit {

  loading = true;
  feature: any = {};
  downloads: any = {};
  showProjectSelection = false;
  projects: any = [];
  addToComparison: any = {};
  operatingPointInputs;
  operationPointId = 0;

  graphData: any = {};
  graphs = [];

  tables = [];
  card = {};
  view = 'feature';
  selectedTab = 0;
  inputData = [];
  links = [];

  modelsToCompare = [];
  projectId;

  id;
  sections = {
    main: true,
    data: true,
    sound: true
  };
  fanOption = 0;

  legend = [
    {
      id: 0,
      name: 'Test 1',
      description: 'test 1',
      value: true
    },
    {
      id: 1,
      name: 'Test 2',
      description: 'test 2',
      value: false
    },
    {
      id: 2,
      name: 'Test 2',
      description: 'test 2',
      value: false
    },
    {
      id: 3,
      name: 'Test 2',
      description: 'test 2',
      value: false
    }
  ];

  additionalOptions = [
    [
      {
        id: 0,
        value: 0,
        description: 'Test 1'
      },
      {
        id: 1,
        value: 1,
        description: 'Test 2'
      }
    ],
    [
      {
        id: 0,
        value: 0,
        description: 'Test 1'
      },
      {
        id: 1,
        value: 1,
        description: 'Test 2'
      }
    ],
    [
      {
        id: 0,
        value: 0,
        description: 'Test 1'
      },
      {
        id: 1,
        value: 1,
        description: 'Test 2'
      }
    ],
    [
      {
        id: 0,
        value: 0,
        description: 'Test 1'
      },
      {
        id: 1,
        value: 1,
        description: 'Test 2'
      }
    ]
  ];
  selected: 0;

  constructor(private operatingPointService: OperatingPointService,
              private projectService: MyProjectsService,
              private zone: NgZone,
              private cd: ChangeDetectorRef,
              private notification: CustomNotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.operationPointId = +localStorage.getItem('operation-point');
  }

  ngOnInit() {
    this.getId((id) => {
      this.id = id;
      this.getCard(id);
      this.getGraph(id);
      // this.getCharts(id);
      this.getLinks(id);
      this.getInputs(id);
      this.getTable(id);
      this.getProjects();
      this.loading = false;
      setTimeout(() => {
        this.zone.run(() => this.cd.markForCheck());
      }, 2000);
    });

    this.modelsToCompare = JSON.parse(localStorage.getItem('comparison')) !== null ? JSON.parse(localStorage.getItem('comparison')) : [];
  }

  getId(cb) {
    this.activatedRoute.params.subscribe((param: Params) => {
      cb(param.id);
    });
  }

  getCard(id): void {
    this.operatingPointService.getCard(id).subscribe((response: any) => {
      this.card = response;
    });
  }
  getGraph(id): void {
    this.operatingPointService.getGraph(id).subscribe((response: any) => {
      this.graphData = response;
    });
  }
  getCharts(id): void {
    this.operatingPointService.getCharts(id).subscribe((response: any) => {
      this.graphs = response;
      this.zone.run(() => this.cd.markForCheck());
    });
  }
  postCharts(id, data): void {
    const calcData = {
      staticPressure: 12,
      airFlow: 12,
      rpm: 12,
      power: 12,
      dynamicPressure: 12
    };

    data.forEach((o) => {
      switch (o.name) {
        case 'Power (W)':
          calcData.power = o.value;
          break;
        case 'Dynamic Pressure (Pa)':
          calcData.dynamicPressure = o.value;
          break;
        case 'Air flow  (m3/h)':
          calcData.airFlow = o.value;
          break;
        case 'Static Pressure (Pa)':
          calcData.airFlow = o.value;
          break;
        case 'Speed (1/min)':
          calcData.rpm = o.value;
          break;
        default:
          console.log('not el');
      }
    });
    this.operatingPointService.postCharts(id, calcData).subscribe((response: any) => {
      this.graphs = response;
    });
  }
  getInputs(id): void {
    this.operatingPointService.getInputs(id).subscribe((response: any) => {
      this.operatingPointInputs = response;
      this.getCalculate(id, this.operatingPointInputs);
    });
  }
  getLinks(id): void {
    this.operatingPointService.getLinks(id).subscribe((response: any) => {
      console.log(response);
      this.links = response;
    });
  }
  getTable(id): void {
    this.operatingPointService.getTable(id).subscribe((response: any) => {
      this.tables = response;
    });
  }
  getCalculate(id, data): void {
    const dt = {
      airFlow: Math.round(data[0].defaultValue),
      staticPressure: Math.round(data[1].defaultValue)
    };
    this.operatingPointService.getCalculate(id, dt).subscribe((response: any) => {
      this.tables = response;
      this.postCharts(this.id, this.tables[0].data);
    });
  }

  onPointSelected(event): void {
    this.inputData = [...event];
    // this.getCalculate(this.id, this.operatingPointInputs);
  }

  findAndReplace(object, types, replaceValues) {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.findAndReplace(object[x], types, replaceValues);
        }
        for (const type of types) {
          if (object[x] === type && x === 'type') {
            for (const replaceValue of replaceValues) {
              if (object[x] === replaceValue['type']) {
                object['children'] = replaceValue['children'];
              }
            }
          }
        }
      }
    }
  }
  find(object, type, objectPut) {
    for (const x in object) {
      if (object.hasOwnProperty(x)) {
        if (typeof object[x] === 'object') {
          this.find(object[x], type, objectPut);
        } else if (object[x] === type && x === 'type') {
          objectPut['info'] = object;
        }
      }
    }
  }
  selectTab(newTab) {
    this.selectedTab = newTab;
  }
  getProjects() {
    this.operatingPointService.getProjects().subscribe((response: any) => {
      this.projects = response;
    });
  }
  selectProject(event) {
    this.projectId = event;
  }
  addToComparisonFunc() {
    this.modelsToCompare.push({
      id: this.modelsToCompare.length,
      name: this.card['name'],
      color: 'blue',
      image: this.card['image'],
      data: this.tables
    });

    this.notification.message('success', 'Success', 'Item added to comparison');
    localStorage.setItem('comparison', JSON.stringify(this.modelsToCompare));
  }

  addToProject(event) {
    this.showProjectSelection = false;
    if (this.projectId) {
      this.projectService.insertModels(this.projectId, {
        model: [this.id]
      }).subscribe((response: any) => {
        this.notification.message('success', 'Success', 'Item added to project');
      });
    }
  }
}
