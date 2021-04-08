import {Component, Input, OnInit} from '@angular/core';
import {OrderModel, OrderDetailService, OrderService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  @Input() order: any;
  selectStatus: string;
  statusList = ['start', 'process', 'delivery', 'finish', 'cancel'];
  isLoading = false;

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService) {
    this.orderForm = this.fb.group({
      deliveryDate: [new Date()],
      deliveryPhone: [''],
      finishDate: [new Date()],
    });
  }

  ngOnInit(): void {
    if (this.order) {
      this.orderForm.get('deliveryDate').setValue(this.order.deliveryDate);
      this.orderForm.get('finishDate').setValue(this.order.finishDate);
      this.orderForm.get('deliveryPhone').setValue(this.order.deliveryPhone);
      this.selectStatus = this.order.status;
    }
  }

  cancel(): void {
    this.modal.close();
  }

  onOk(): void {
    this.isLoading = true;
    const model = this.order;
    model.deliveryDate = this.datePipe.transform(this.orderForm.controls.deliveryDate.value, 'yyyy-MM-dd HH:mm:ss');
    model.finishDate = this.datePipe.transform(this.orderForm.controls.finishDate.value, 'yyyy-MM-dd HH:mm:ss');
    model.deliveryPhone = this.orderForm.controls.deliveryPhone.value;
    model.status = this.selectStatus;
    this.orderService.update(model).then(() => {
      this.isLoading = false;
      this.modal.close(true);
    });
  }
}
