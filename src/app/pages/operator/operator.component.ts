import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CouponsService, ModalService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { OperatorAddComponent } from './operator-add/operator-add.component';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: any = [];
  list: any;
  operators: Observable<any>;
  operator: any;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService,
              private adminService: AdminService) { 
  }

  ngOnInit(): void {
    this.bindData();
    this.adminService.fetchAllOperators().subscribe((res) => {
      this.operators = res;
      // console.log(res)
    });
  }

  bindData(): void {
    this.adminService.fetchAllOperators().subscribe(res => {
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
      this.adminService.fetchAllOperators().subscribe(res => {
        this.operators = res;
      })
    }
    else {
      this.adminService.fetchOperatorByName(searchValue).subscribe(res => {
        this.operators = res;
      });
    }
  }


  deleteRow(operator){
      this.adminService.deleteOperator(operator.operatorId).subscribe((res) => {
        this.modalService.success(res.message);
        this.adminService.fetchAllOperators().subscribe(res => {
          this.operators = res;
        })
      });    
  }

  editRow(operator): void {
    this.createComponentModal(true, operator);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Operator' : 'Add Operator',
      nzContent: OperatorAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllOperators().subscribe(res => {
        this.operators = res;
        // console.log(res)
      })
    });
  }

}
