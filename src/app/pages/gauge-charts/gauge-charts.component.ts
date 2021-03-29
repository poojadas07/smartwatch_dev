import {Component, OnDestroy, OnInit} from '@angular/core';
import {timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-gauge-charts',
  templateUrl: './gauge-charts.component.html',
  styleUrls: ['./gauge-charts.component.scss']
})
export class GaugeChartsComponent implements OnInit, OnDestroy {
  chartInstance: any;
  options = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
      show: false,
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Run',
        type: 'gauge',
        title: {
          textStyle: {
            fontWeight: 'bolder',
            fontSize: 20,
            fontStyle: 'italic',
            color: '#fff',
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        axisLine: {
          lineStyle: {
            color: [[0.1, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
            width: 20,
            shadowColor: '#fff',
            shadowBlur: 10
          }
        },
        detail: {formatter: '{value}%'},
        data: [{value: 50, name: 'Run'}]
      }
    ]
  };
  time: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.time = timer(3000, 1500).subscribe(r => {
      this.options.series[0].data[0].value = parseFloat((Math.random() * 100).toFixed(2));
      if (this.chartInstance) {
        this.chartInstance.setOption(this.options, true);
      }
    });
  }

  onChartInit(e: any): void {
    this.chartInstance = e;
  }

  ngOnDestroy(): void {
    this.time.unsubscribe();
  }

}
