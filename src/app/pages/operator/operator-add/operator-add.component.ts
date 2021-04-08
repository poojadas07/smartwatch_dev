import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CouponModel, ModalService, CouponsService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-operator-add',
  templateUrl: './operator-add.component.html',
  styleUrls: ['./operator-add.component.scss']
})
export class OperatorAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  operator: any;
  id: any;
  operators: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    if (this.isEdit) {
      this.adminService.fetchOperatorById(this.data.operatorId).subscribe((res) => {
        this.operator = res;
        // console.log(this.country);
        this.cForm.get('name').setValue(this.operator.operatorName);
      });
    }
  }

  
  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new CouponModel();
    model.name = this.cForm.controls.name.value;
    if (this.isEdit) {
      model.id = this.data.operatorId;
      // console.log(model.id)
      this.adminService.updateOperator(model.id , model.name).subscribe(res => {
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
      this.adminService.addOperators( model.name).subscribe(res => {
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
