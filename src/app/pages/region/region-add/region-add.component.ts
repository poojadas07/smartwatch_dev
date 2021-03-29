import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponModel, CouponsService, ModalService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {DatePipe} from '@angular/common';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.scss']
})
export class RegionAddComponent implements OnInit {

  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  
  region: any;
  countries: any;
  id: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      name: ['', [Validators.required]],
      countryName: ['' , [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.adminService.fetchAllContries().subscribe((res) => {
      this.countries = res;
      // console.log(this.countries);
    });
    
    if (this.isEdit) {
      this.adminService.fetchRegionById(this.data.regionId).subscribe((res) => {
        this.region = res;
        // console.log(this.region);
        this.cForm.get('name').setValue(this.region.regionName);
        this.cForm.get('countryName').setValue(this.region.country.countryId);
      });
    }
  }

  // fieldSelected(index: any) {
  //     console.log("Option got selected " , index);
  // }
  
  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new CouponModel();
    model.name = this.cForm.controls.name.value;
    model.countryName = this.cForm.controls.countryName.value;
    if (this.isEdit) {
      model.id = this.data.regionId;
      // console.log(model.id)
      this.adminService.updateRegion(model.id ,model.countryName , model.name).subscribe(res => {
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
      console.log(model.countryName)
      this.adminService.addRegions(model.countryName ,model.name).subscribe(res => {
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
