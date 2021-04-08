import { Component, OnInit } from '@angular/core';
import {CouponModel, CouponsService, ModalService} from '../../shared';
import { DepartmentAddComponent } from './department-add/department-add.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: any = [];
  list: any;
  departments: Observable<any>;
  department: any;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService,
              private adminService: AdminService) { 
  }

  ngOnInit(): void {
    this.bindData();
    this.adminService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
      console.log(res)
    });
  }

  bindData(): void {
    // this.couponService.getList().subscribe(r => {
    //   this.allList = r;
    //   this.list = this.allList;
    //   this.list = this.list.sort((a, b) => a.sort - b.sort);
    // });
    this.adminService.fetchAllDepartments().subscribe(res => {
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
    // const data = this.allList.filter(d => d.clientName.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1);
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
      this.adminService.fetchAllDepartments().subscribe(res => {
        this.departments = res;
      })
    }
    else {
      this.adminService.fetchDepartmentByName(searchValue).subscribe(res => {
        this.departments = res;
      });
    }
  }


  deleteRow(department){
    // this.list = this.list.filter(d => d.id !== id);
    // this.couponService.delete(id).then(() => {
    //   this.modalService.success('delete success!');
    // });
      this.adminService.deleteDepartment(department.departmentId).subscribe((res) => {
        this.modalService.success(res.message);
        this.adminService.fetchAllDepartments().subscribe(res => {
          this.departments = res;
        })
      });    
  }

  editRow(department): void {
    this.createComponentModal(true, department);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Department' : 'Add Department',
      nzContent: DepartmentAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllDepartments().subscribe(res => {
        this.departments = res;
        // console.log(res)
      })
    });
  }

}
