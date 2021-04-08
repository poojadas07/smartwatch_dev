import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CouponModel, ModalService, CouponsService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  department: any;
  id: any;
  departments: any;
  clients: any;
  locations: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {
    this.cForm = this.fb.group({
      clientName: ['', [Validators.required]],
      locationName: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
    
  }

  ngOnInit(): void {

    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
      // console.log(this.countries);
    });

    this.adminService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
      // console.log(this.countries);
    });
    
    if (this.isEdit) {
      this.adminService.fetchDepartmentById(this.data.departmentId).subscribe((res) => {
        this.department = res;
        this.cForm.get('name').setValue(this.department.departmentName);
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
    model.clientName = this.cForm.controls.clientName.value;
    model.locationName = this.cForm.controls.locationName.value;
    // model.phoneNo = this.cForm.controls.phoneNo.value;
    // model.address = this.cForm.controls.address.value;
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
      model.id = this.data.departmentId;
      // console.log(model.id)
      this.adminService.updateDepartment(model.id , model.name).subscribe(res => {
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
      this.adminService.addDepartment(model.clientName , model.locationName ,  model.name).subscribe(res => {
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
