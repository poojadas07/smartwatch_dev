import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CouponModel, CouponsService, ModalService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {DatePipe} from '@angular/common';
import { AdminService } from 'src/app/shared/services/api/admin.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {
 
  cForm: FormGroup;
  @Input() isEdit;
  @Input() data: CouponModel;
  isLoading = false;
  location: any;
  regions: any;
  countries: any;
  id: any;
  selectedCountryName: any;
  selectedRegionName: any;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private couponService: CouponsService,
              private adminService: AdminService) {

    this.cForm = this.fb.group({
      name: ['', [Validators.required]],
      regionName: ['' , [Validators.required]],
      countryName: ['' , [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.adminService.fetchAllContries().subscribe((res) => {
      this.countries = res;
    });
    
    if (this.isEdit) {
      this.adminService.fetchLocationById(this.data.locationId).subscribe((res) => {
        this.location = res;
        // console.log(this.country);
        this.cForm.get('name').setValue(this.location.locationName);
        this.cForm.get('regionName').setValue(this.location.region.regionId);
        this.cForm.get('countryName').setValue(this.location.region.country.countryId);
      });
    }
  }

  onRowClick(){
    console.log(this.selectedCountryName)
    this.regions = null;
    this.selectedRegionName = null;
    this.adminService.fetchRegionByCountryName(this.selectedCountryName).subscribe((res) => {
      this.regions = res;
    })
    }
  
  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new CouponModel();
    model.name = this.cForm.controls.name.value;
    model.regionName = this.cForm.controls.regionName.value;
    if (this.isEdit) {
      model.id = this.data.locationId;
      // console.log(model.id)
      this.adminService.updateLocation(model.id , model.regionName , model.name).subscribe(res => {
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
      this.adminService.addLocation(model.regionName , model.name).subscribe(res => {
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
