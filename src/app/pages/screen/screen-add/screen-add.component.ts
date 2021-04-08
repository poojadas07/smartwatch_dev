import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CouponModel, ModalService, CouponsService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-screen-add',
  templateUrl: './screen-add.component.html',
  styleUrls: ['./screen-add.component.scss']
})
export class ScreenAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  screen: any;
  id: any;
  screens: any;
  departments: any;
  clients: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      name: ['', [Validators.required]],
      departmentName: ['' , [Validators.required]],
      clientName: ['' , [Validators.required]],
      rowNo: ['', [Validators.required]],
      colNo: ['', [Validators.required]]
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

    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
      // console.log(this.clients);
    });

    this.adminService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
      // console.log(this.departments);
    });
    
    if (this.isEdit) {
      this.adminService.fetchScreenById(this.data.screenId).subscribe((res) => {
        this.screen = res;
        // console.log(this.screen);
        this.cForm.get('name').setValue(this.screen.screenName);
        this.cForm.get('departmentName').setValue(this.screen.department.departmentName);
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
    model.departmentName = this.cForm.controls.departmentName.value;
    model.rowNo = this.cForm.controls.rowNo.value;
    model.colNo = this.cForm.controls.colNo.value;
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
      model.id = this.data.screenId;
      // console.log(model.id)
      this.adminService.updateScreen(model.id , model.name , model.departmentName).subscribe(res => {
        this.isLoading = false;
        this.modal.close(true);
        if (res.status == 200) {
          this.modalService.success(res.message);
        }
        else{
          this.modalService.warning(res.message);
        }
      });
    } else {
      this.adminService.addScreens(model.name , model.departmentName , model.rowNo , model.colNo).subscribe(res => {
        this.isLoading = false;
        this.modal.close(true);
        if (res.status == 200) {
          this.modalService.success(res.message);
        }
        else{
          this.modalService.warning(res.message);
        }
      });
    }
  }
  
}
