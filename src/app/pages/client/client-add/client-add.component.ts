import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponModel, CouponsService, ModalService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {DatePipe} from '@angular/common';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  client: any;
  id: any;
  clienties: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      address: ['', [Validators.required]],
      // sort: [1, [Validators.required]],
      // enable: [true, [Validators.required]],
      // discountAmount: [0, [Validators.required]],
      // amount: [100, [Validators.required]],
      // beginDate: [new Date(), [Validators.required]],
      // endDate: [new Date(), [Validators.required]],
      // desc: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    
    if (this.isEdit) {
      this.adminService.fetchClientById(this.data.clientId).subscribe((res) => {
        this.client = res;
        // console.log(this.country);
        this.cForm.get('name').setValue(this.client.clientName);
        this.cForm.get('phoneNo').setValue(this.client.clientPhone);
        this.cForm.get('address').setValue(this.client.clientAddress);
      });
    }
    // if (this.data) {
    //   this.cForm.get('name').setValue(this.data.name);
    //   // this.cForm.get('desc').setValue(this.data.desc);
    //   // this.cForm.get('sort').setValue(this.data.sort);
    //   // this.cForm.get('amount').setValue(this.data.amount);
    //   // this.cForm.get('enable').setValue(this.data.enable);
    //   // this.cForm.get('discountAmount').setValue(this.data.discountAmount);
    //   // this.cForm.get('beginDate').setValue(this.data.beginDate);
    //   // this.cForm.get('endDate').setValue(this.data.endDate);
    // }
  }

  
  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new CouponModel();
    model.name = this.cForm.controls.name.value;
    model.phoneNo = this.cForm.controls.phoneNo.value;
    model.address = this.cForm.controls.address.value;
    // model.desc = this.cForm.controls.desc.value;
    // model.enable = this.cForm.controls.enable.value;
    // model.sort = +this.cForm.controls.sort.value;
    // model.amount = +this.cForm.controls.amount.value;
    // model.discountAmount = +this.cForm.controls.discountAmount.value;
    // model.beginDate = this.datePipe.transform(this.cForm.controls.beginDate.value, 'yyyy-MM-dd HH:mm:ss');
    // model.endDate = this.datePipe.transform(this.cForm.controls.endDate.value, 'yyyy-MM-dd HH:mm:ss');
    // model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // console.log(this.data.countryId)
    if (this.isEdit) {
      model.id = this.data.clientId;
      // console.log(model.id)
      this.adminService.updateClient(model.id , model.name , model.phoneNo , model.address).subscribe(res => {
        this.isLoading = false;
        this.modal.close(true);
        if (res.status == 200) {
          this.modalService.success(res.message);
        }
        else{
          this.modalService.warning(res.message);
        }
      });
      // this.couponService.update(model).then(() => {
      //   this.isLoading = false;
      //   this.modal.close(true);
      // });
    } else {
      this.adminService.addClient( model.name , model.phoneNo , model.address).subscribe(res => {
        this.isLoading = false;
        this.modal.close(true);
        if (res.status == 200) {
          this.modalService.success(res.message);
        }
        else{
          this.modalService.warning(res.message);
        }
        
      });
      // this.couponService.addModel(model).then(() => {
      //   this.isLoading = false;
      //   this.modal.close(true);
      // });
    }
  }

}
