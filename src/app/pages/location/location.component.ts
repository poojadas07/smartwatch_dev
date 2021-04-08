import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CouponsService, ModalService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { LocationAddComponent } from './location-add/location-add.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  sortName = '';
  sortValue = '';
  searchValue = '';
  searchRegion = '';
  allList: any = [];
  list: any;
  locations: Observable<any>;
  regions: Observable<any>;
  countries: Observable<any>;
  country: any;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService,
              private adminService: AdminService) {

  }

  ngOnInit() {
    this.bindData();
    this.adminService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
    });

    this.adminService.fetchAllRegions().subscribe((res) => {
      this.regions = res;
    });

    this.adminService.fetchAllContries().subscribe((res) => {
      this.countries = res;
    });
  }

  bindData(): void {
    // this.couponService.getList().subscribe(r => {
    //   this.allList = r;
    //   this.list = this.allList;
    //   this.list = this.list.sort((a, b) => a.sort - b.sort);
    // });
    this.adminService.fetchAllLocations().subscribe(res => {
      this.allList = res;
      this.list = this.allList;
      this.list = this.list.sort((a,b) => a.sort - b.sort);
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    console.log(sort.key , sort.value)
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(){
    console.log(this.allList)
    // const data = this.allList.filter(d => d.countryName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
    // console.log(data)
    if (this.sortName && this.sortValue) {
      this.list = this.list.sort((a, b) => {
          return this.sortValue === 'ascend'
            // tslint:disable-next-line:no-non-null-assertion
            ? (a[this.sortName] > b[this.sortName] ? 1 : -1)
            // tslint:disable-next-line:no-non-null-assertion
            : b[this.sortName] > a[this.sortName] ? 1 : -1;
        }
      );
    }
    else{
      this.list = this.list;
    }
  }

  searchByKeyword(searchValue){
    if (searchValue == null){
      this.adminService.fetchAllLocations().subscribe(res => {
        this.locations = res;
      })
    }
    else {
      this.adminService.fetchLocationByName(searchValue).subscribe(res => {
        this.locations = res;
      });
    }
  }

  searchByRegion(searchRegion){
    if (searchRegion == null){
      this.adminService.fetchAllLocations().subscribe(res => {
        this.locations = res;
      })
    }
    else {
      this.adminService.fetchLocationByRegionName(searchRegion).subscribe(res => {
        this.locations = res;
      });
    }
  }


  deleteRow(location){
    // this.list = this.list.filter(d => d.id !== id);
    // this.couponService.delete(id).then(() => {
    //   this.modalService.success('delete success!');
    // });
      this.adminService.deleteLocation(location.locationId).subscribe((res) => {
        this.modalService.success(res.message);
        this.adminService.fetchAllLocations().subscribe(res => {
          this.locations = res;
        })
      });    
  }

  editRow(location): void {
    this.createComponentModal(true, location);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Location' : 'Add Location',
      nzContent: LocationAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllLocations().subscribe(res => {
        this.locations = res;
      })
    });
  }

}
