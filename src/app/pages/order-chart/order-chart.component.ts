import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService, LineModel, ChartModel, BarModel, ConfigModel} from '../../shared';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.scss']
})
export class OrderChartComponent implements OnInit, OnDestroy {
  list: Array<LineModel>;
  chartList: Array<ChartModel>;
  time: Subscription;

  constructor(private orderService: OrderService) {
    if (ConfigModel.isTest) {
      this.time = interval(2000).subscribe(r => {
        this.generateList();
      });
    } else {
      this.getList();
    }

  }

  ngOnDestroy(): void {
    this.time.unsubscribe();
  }

  ngOnInit(): void {
  }

  getList(): void {
    this.orderService.getSaleAndNums().subscribe(r => {
      this.chartList = r;
      this.list = new Array<LineModel>();
      this.list.push({name: 'Sales', series: []});
      this.list.push({name: 'Nums', series: []});
      this.chartList.map(c => {
        this.list.map((l, index) => {
          this.list[index].series.push({name: c.name, value: index === 0 ? c.sales : c.num});
        });
      });

    });
  }

  generateList(): void {
    this.list = new Array<LineModel>();
    this.list.push({name: 'Sales', series: this.generateData()});
    this.list.push({name: 'Nums', series: this.generateData()});
  }

  generateData(): Array<BarModel> {
    const arr: Array<BarModel> = [];
    for (let i = 0; i < 10; i++) {
      const value = Math.floor(Math.random() * 100 + 90);
      arr.push({name: `${i + 1}month`, value});
    }
    return arr;
  }
}
