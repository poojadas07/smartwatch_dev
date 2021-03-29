import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CouponModel, ModalService, CouponsService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-dashboard-add',
  templateUrl: './dashboard-add.component.html',
  styleUrls: ['./dashboard-add.component.scss']
})
export class DashboardAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  panel: any;
  id: any;
  countries: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      row: ['', [Validators.required]],
      column: ['', [Validators.required]],
      sensorId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    if (this.isEdit) {
      this.adminService.fetchPanelById(this.data.panelId).subscribe((res) => {
        this.panel = res;
        // console.log(this.panel);
        this.cForm.get('row').setValue(this.panel.rowNo);
        this.cForm.get('column').setValue(this.panel.columnNo);
        this.cForm.get('sensorId').setValue(this.panel.sensorId);
      });
    }
  }

  
  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new CouponModel();
    model.sensorId = this.cForm.controls.sensorId.value;
    if (this.isEdit) {
      model.id = this.data.panelId;
      // console.log(model.id)
      this.adminService.pairPanelWithSensor(model.id , model.sensorId).subscribe(panel => {
        this.isLoading = false;
        this.modal.close(true);
        this.modalService.success("Updated Successfully !!");
      });
    } else {
      this.adminService.addCountries(model.sensorId).subscribe(country => {
        this.isLoading = false;
        this.modal.close(true);
        this.modalService.success("Added Successfully !!");
        // console.log('hello')
        
      });
    }
  }

}
