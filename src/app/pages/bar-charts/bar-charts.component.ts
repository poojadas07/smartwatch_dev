import {Component, OnInit} from '@angular/core';
import {graphic} from 'echarts';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.scss']
})
export class BarChartsComponent implements OnInit {
  options: any;

  constructor() {
  }

  ngOnInit(): void {
    const dataAxis = ['8 Mar', '9 Mar', '10 Mar', '11 Mar', '12 Mar', '13 Mar', '14 Mar', '15 Mar'];
    const data = [600, 630, 800, 700, 900, 567, 763, 376];
    const yMax = 950;
    const dataShadow = [];
    data.map(d => dataShadow.push(yMax));
    this.options = {
      title: {
        text: 'Calories',
        left: 'center',
        top: 'top',
        textStyle: {
          color: 'white'
        },
      },
      grid: {
        top: 20,
        bottom: 20
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(245, 245, 241, 1)'
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#999'
          }
        },
        splitLine: {
          show: false
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          itemStyle: {
            color: new graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#ff59a3'},
                {offset: 0.5, color: '#fe7f70'},
                {offset: 1, color: '#fcad2e'},
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#fcad2e'},
                  {offset: 0.7, color: '#fe7f70'},
                  {offset: 1, color: '#ff59a3'},
                ]
              )
            }
          },
          data
        }
      ]
    };

  }

}
