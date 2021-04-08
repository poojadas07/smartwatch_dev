import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CouponsService, ModalService } from 'src/app/shared';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { ScreenAddComponent } from './screen-add/screen-add.component';

export interface Tile {
  color: string;
  text: string;
}

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  sortName = '';
  sortValue = '';
  searchValue = '';
  searchDepartment = '';
  allList: any = [];
  list: any;
  screens: Observable<any>;
  departments: any;
  panels: any;
  color: String;

  constructor(
    private modalService: ModalService,
    private mService: NzModalService,
    private adminService: AdminService) {
  }

  ngOnInit() {
    this.bindData();
    this.adminService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
      console.log(res)

      for (let i = 0; i < res.length; i++) {
        this.adminService.fetchPanelByScreen(this.screens[i].screenId).subscribe((res) => {
          this.screens[i].panels = res;
          console.log(res);
        });
      }
    });

    this.adminService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  bindData(): void {
    // this.couponService.getList().subscribe(r => {
    //   this.allList = r;
    //   this.list = this.allList;
    //   this.list = this.list.sort((a, b) => a.sort - b.sort);
    // });
    this.adminService.fetchAllScreens().subscribe(res => {
      this.allList = res;
      this.list = this.allList;
      this.list = this.list.sort((a, b) => a.sort - b.sort);
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    console.log(sort.key, sort.value)
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
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
    else {
      this.list = this.list;
    }
  }

  searchByKeyword(searchValue) {
    if (searchValue == null) {
      this.adminService.fetchAllScreens().subscribe(res => {
        this.screens = res;
      })
    }
    else {
      this.adminService.fetchScreenByName(searchValue).subscribe(res => {
        this.screens = res;
      });
    }
  }

  searchByDepartment(searchDepartment) {
    console.log(searchDepartment)
    if (searchDepartment == '') {
      this.adminService.fetchAllScreens().subscribe(res => {
        this.screens = res;
      })
    }
    else {
      this.adminService.fetchScreenByDepartmentName(searchDepartment).subscribe(res => {
        this.screens = res;
      });
    }
  }


  deleteRow(screen) {
    // this.list = this.list.filter(d => d.id !== id);
    // this.couponService.delete(id).then(() => {
    //   this.modalService.success('delete success!');
    // });
    this.adminService.deleteScreen(screen.screenId).subscribe((res) => {
      this.modalService.success(res.message);
      this.adminService.fetchAllScreens().subscribe(res => {
        this.screens = res;
      })
    });
  }

  editRow(screen): void {
    this.createComponentModal(true, screen);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Screen' : 'Add Screen',
      nzContent: ScreenAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllScreens().subscribe(res => {
        this.screens = res;
      })
    });
  }


}
