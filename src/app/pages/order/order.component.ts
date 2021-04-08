import {Component, OnInit} from '@angular/core';
import {OrderModel, OrderService, OrderDetailService, ModalService, OrderDetailModel} from '../../shared';
import {NzModalService} from 'ng-zorro-antd/modal';
import {OrderViewComponent} from './order-view/order-view.component';
import {OrderEditComponent} from './order-edit/order-edit.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: Array<OrderModel> = [];
  list: Array<OrderModel>;
  isLoading = false;

  constructor(private orderService: OrderService,
              private detailService: OrderDetailService,
              private modalService: ModalService,
              private mService: NzModalService) {

  }

  ngOnInit(): void {
    this.bindData();
  }

  bindData(): void {
    this.orderService.getOrderList1().subscribe(result => {
      this.allList = result;
      this.allList = this.allList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.list = this.allList;
    });
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    this.list = this.allList.filter(d => d.orderNo.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  onEdit(data): void {
    this.createComponentModal(data);
  }

  createComponentModal(data: any): void {
    const modal = this.mService.create({
      nzTitle: 'Edit Order',
      nzContent: OrderEditComponent,
      nzComponentParams: {
        order: data
      },
      nzWidth: '750px'
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
    });
  }

  onView(data: any): void {
    this.mService.create({
      nzTitle: 'Orders Info',
      nzContent: OrderViewComponent,
      nzComponentParams: {
        data
      },
      nzWidth: '900px'
    });
  }

}
