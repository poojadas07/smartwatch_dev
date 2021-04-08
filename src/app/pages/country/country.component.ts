import {Component, OnInit} from '@angular/core';
import {CouponModel, CouponsService, ModalService} from '../../shared';
import {CountryAddComponent} from './country-add/country-add.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: any = [];
  list: any;
  countries: Observable<any>;
  country: any;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService,
              private adminService: AdminService) {

  }

  ngOnInit() {
    this.bindData();
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
    this.adminService.fetchAllContries().subscribe(res => {
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
      this.adminService.fetchAllContries().subscribe(res => {
        this.countries = res;
      })
    }
    else {
      this.adminService.fetchContryByName(searchValue).subscribe(res => {
        this.countries = res;
      });
    }
  }


  deleteRow(country){
    // this.list = this.list.filter(d => d.id !== id);
    // this.couponService.delete(id).then(() => {
    //   this.modalService.success('delete success!');
    // });
      this.adminService.deleteCountry(country.countryId).subscribe((res) => {
        this.modalService.success(res.message);
        this.adminService.fetchAllContries().subscribe(res => {
          this.countries = res;
        })
      });    
  }

  editRow(country): void {
    this.createComponentModal(true, country);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Country' : 'Add Country',
      nzContent: CountryAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllContries().subscribe(res => {
        this.countries = res;
      })
    });
  }

}
