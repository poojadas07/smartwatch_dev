import { Component, OnInit } from '@angular/core';
import {CouponModel, CouponsService, ModalService} from '../../shared';
import { ClientAddComponent } from './client-add/client-add.component';
import {NzModalService} from 'ng-zorro-antd/modal';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  sortName = '';
  sortValue = '';
  searchValue = '';
  allList: any = [];
  list: any;
  clients: Observable<any>;
  client: any;

  constructor(private couponService: CouponsService,
              private modalService: ModalService,
              private mService: NzModalService,
              private adminService: AdminService) { 
  }

  ngOnInit(): void {
    this.bindData();
    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
      // console.log(res)
    });
  }

  bindData(): void {
    // this.couponService.getList().subscribe(r => {
    //   this.allList = r;
    //   this.list = this.allList;
    //   this.list = this.list.sort((a, b) => a.sort - b.sort);
    // });
    this.adminService.fetchAllClients().subscribe(res => {
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
      this.adminService.fetchAllClients().subscribe(res => {
        this.clients = res;
      })
    }
    else {
      this.adminService.fetchClientByName(searchValue).subscribe(res => {
        this.clients = res;
      });
    }
  }


  deleteRow(client){
    // this.list = this.list.filter(d => d.id !== id);
    // this.couponService.delete(id).then(() => {
    //   this.modalService.success('delete success!');
    // });
      this.adminService.deleteClient(client.clientId).subscribe((res) => {
        this.modalService.success(res.message);
        this.adminService.fetchAllClients().subscribe(res => {
          this.clients = res;
        })
      });    
  }

  editRow(client): void {
    this.createComponentModal(true, client);
  }

  add(): void {
    this.createComponentModal(false);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Edit Client' : 'Add Client',
      nzContent: ClientAddComponent,
      nzComponentParams: { isEdit, data }
    });
    modal.afterClose.subscribe(result => {
      if (result) {
        this.bindData();
      }
      // console.log('hello')
      this.adminService.fetchAllClients().subscribe(res => {
        this.clients = res;
        // console.log(res)
      })
    });
  }

}
