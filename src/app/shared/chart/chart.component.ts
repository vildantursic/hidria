import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Chart from 'chart.js';
import {ChartServiceService} from '../../services/chart-service/chart-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chart-component',
  template: `
    <div style="background: #fff !important">
      <canvas [id]="canvasId" width="content-box" height="200"></canvas>
    </div>
  `,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() canvasId: string;
  chartData: any = {};
  viewInit: Boolean = false;
  myBarChart: any;
  @Input() set setChartData(data: any) {
    this.chartData = data;
    if (this.viewInit) {
      this.myBarChart.destroy();
      this.generateGraph();
    }
  }
  @Input() toFill: boolean;
  @Output() points: EventEmitter<Array<string>> = new EventEmitter();
  hovered = '';

  constructor(private chartService: ChartServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.generateGraph();
    this.viewInit = true;
  }

  generateGraph() {
    const canvas = <HTMLCanvasElement> document.getElementById(this.canvasId);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const data = this.getGraphData();
    const options = this.getOptions();

    this.myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }

  getGraphData() {
    const data: any = {};
    data.labels = this.chartData.xpoints;
    data.datasets = [];
    for (let i = 0; i < this.chartData.ypoints.length; i++) {
      const fill = (i === 0 && this.toFill);
      data.datasets.push({
        'label': this.chartData.labels[i],
        'data': this.chartData.ypoints[i],
        'yValue': this.chartData.ypoints[i],
        'xValue': this.chartData.xpoints,
        'yLabel': this.chartData.yLabel,
        'xUnit': this.chartData.xUnit,
        'yUnit': this.chartData.yUnit,
        'xLabel': this.chartData.xLabel,
        'borderColor': this.chartData.borderColor[i],
        'links': this.chartData.links[i],
        'fill': fill
      });
    }
    return data;
  }

  getOptions() {
    const self = this;
    {
      return {
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {}
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 10,
            },
            scaleLabel: {
              display: true,
              labelString: self.chartData.yUnit
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              maxRotation: 0,
              maxTicksLimit: 5,
            },
            scaleLabel: {
              display: true,
              labelString: self.chartData.xUnit
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
          custom: function(tooltip) {
            if (!tooltip) { return; }
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function(tooltipItem, data) {
              return [
                data.datasets[tooltipItem.datasetIndex].label,
                data.datasets[tooltipItem.datasetIndex].xLabel + ' ' + data.datasets[tooltipItem.datasetIndex].xUnit
                + ': ' + data.datasets[tooltipItem.datasetIndex].xValue[tooltipItem.index],
                data.datasets[tooltipItem.datasetIndex].yLabel + ' ' + data.datasets[tooltipItem.datasetIndex].yUnit
                + ': ' + data.datasets[tooltipItem.datasetIndex].yValue[tooltipItem.index],
              ];
            },
            title: function(tooltipItem, data) {
              return;
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        onClick: function (clickEvt, activeElements) {
          const link = this.data.datasets[activeElements[0]._datasetIndex].links;
          self.router.navigate([link]);
        },
        onHover: function(hoverEvt, activeElements) {
          const hovered = activeElements[0] ? this.data.datasets[activeElements[0]._datasetIndex].label : '';
          if (hovered !== self.hovered) {
            self.hovered = hovered;
            self.chartService.changeFanSelect(hovered);
          }
        }
      };
    }
  }

}
