import {Component, OnInit} from '@angular/core';
import {graphic} from 'echarts';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit {
  options = {
    title: {
      text: 'Pie Charts',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Gym', 'Run', 'Bike', 'Walk'],
      textStyle: {
        color: 'black',
        fontSize: 12
      }
    },
    series: [
      {
        name: 'sport',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        label: {
          color: 'black'
        },
        data: [
          {value: 335, name: 'Gym'},
          {value: 310, name: 'Run'},
          {value: 234, name: 'Bike'},
          {value: 135, name: 'Walk'},
        ],
        itemStyle: {
          normal: {
            color: params => {
              const colorList = [
                {
                  c1: ' #ff59a3',
                  c2: '#fcad2e'
                },
                {
                  c1: ' #ca5cf8',
                  c2: '#e9c3f8'
                },
                {
                  c1: ' #fb7963',
                  c2: '#fcd8d2'
                },
                {
                  c1: ' #f96f96',
                  c2: '#d390d9'
                }];
              return new graphic.LinearGradient(1, 0, 0, 0,
                [{
                  offset: 0,
                  color: colorList[params.dataIndex].c1
                }, {
                  offset: 1,
                  color: colorList[params.dataIndex].c2
                }]);

            }
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
