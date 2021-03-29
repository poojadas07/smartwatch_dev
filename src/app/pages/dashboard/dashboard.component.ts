import { Component, OnInit } from '@angular/core';
import { FavoriteService, LogService, NoticeService, OrderService, UsersService } from '../../shared/services/firebase-api';
import { BarModel, ConfigModel, LineModel, OrderModel } from '../../shared/model';
import * as shape from 'd3-shape';
import { MockDataService, PageDataService } from '../../shared';
import { StorageMap } from '@ngx-pwa/local-storage';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/shared/services/api/admin.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import { DashboardAddComponent } from './dashboard-add/dashboard-add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  loadingOrder = false;
  loadingCate = false;
  loadingDevice = false;
  loadingUser = false;
  loadingVisit = false;
  showXAxis = true;
  showYAxis = true;
  curve: any = shape.curveBasis;
  barList: Array<BarModel>;
  barHorizontalList: Array<BarModel>;
  lineList: Array<LineModel>;
  pieList: Array<BarModel>;
  pipList: Array<BarModel>;
  visitList: Array<LineModel>;
  totalVisits = 0;
  totalUsers = 0;
  totalSales = 0;
  totalOrders = 0;
  totalNotices = 0;
  totalFavorites = 0;
  screens: Observable<any>;
  clients: any;
  locations: any;
  departments: any;
  client: any;
  location: any;
  department: any;
  clientValue: any;
  locationValue: any;
  countrySize: any;
  regionSize: any;
  userSize: any;
  clientSize: any;
  locationSize: any;
  departmentSize: any;
  screensSize: any;
  activeScreens= 0;
  countries: any;


  constructor(private storage: StorageMap,
    private orderService: OrderService,
    private userService: UsersService,
    private logService: LogService,
    private noticeService: NoticeService,
    private favoriteService: FavoriteService,
    private pageService: PageDataService,
    private mockService: MockDataService,
    private adminService: AdminService,
    private mService: NzModalService,) {

  }

  ngOnInit(): void {

    this.adminService.fetchAllContries().subscribe((res) => {
      // this.clients = res;
      this.countrySize = res.length;
    });

    this.adminService.fetchAllRegions().subscribe((res) => {
      // this.clients = res;
      this.regionSize = res.length;
    });

    this.adminService.fetchAllUsers().subscribe((res) => {
      // this.clients = res;
      this.userSize = res.length;
    });

    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
      this.clientSize = res.length;
    });

    this.adminService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
      this.locationSize = res.length;
    });

    this.adminService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
      this.departmentSize = res.length;
    });

    this.bindData();
    this.bindChart();
    this.bindPanelData();
  }

  bindPanelData(): void {
    this.adminService.fetchAllScreens().subscribe((res) => {
      this.screens = res;
      this.screensSize = res.length;
      console.log(res);

      for (let i = 0; i < res.length; i++) {
        this.adminService.fetchPanelByScreen(this.screens[i].screenId).subscribe((res) => {
          this.screens[i].panels = res;

          console.log(res);
          for (let j = 0; j < this.screens[i].panels.length; j++) {
            this.screens[i].panels[j].index = j+1;
          }
        });
      }
    });
  }

  getColor(panel) {
    if (panel.currentValue == null) {
      return '#d3d3d3';
    }
    else if (panel.currentValue == '0') {
      return '#e13026'; // Red Accent color
    } else {
      return '#67bf40' // Green Accent Color
    }
  }

  changeClient(event: any) {
    // console.log(this.client);
    return this.client;
  }

  changeLocation(event: any){
    // console.log(this.location);

    this.clientValue = this.changeClient(($event)=>this.changeClient($event));
    console.log(this.clientValue ,this.location);
    
    if ((this.clientValue == '') && (this.location == '')) {
      
    }
    else{
      this.adminService.fetchDepartmentByClientLocation(this.clientValue , this.location).subscribe((res) => {
        this.departments = res;
        // console.log(this.clientValue ,this.location)
      });
    }
  }
  
  changeDepartment(event: any){
    console.log(this.department);
    
    
      this.adminService.fetchScreenByDepartmentName(this.department).subscribe((res) => {
          this.screens = res;
          console.log(res);

        for (let i = 0; i < res.length; i++) {
          this.adminService.fetchPanelByScreen(this.screens[i].screenId).subscribe((res) => {
            this.screens[i].panels = res;

            console.log(res);
            for (let j = 0; j < this.screens[i].panels.length; j++) {
              this.screens[i].panels[j].index = j+1;
            }
          });
        }
      });
    
  }

  reset(){
    this.client = "";
    this.location = "";
    this.department = "";

    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
    });

    this.adminService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
    });

    this.adminService.fetchAllDepartments().subscribe((res) => {
      this.departments = res;
    });

    this.bindPanelData();
  }

  editRow(panel): void {
    this.createComponentModal(true, panel);
  }

  createComponentModal(isEdit: boolean, data = null): void {
    const modal = this.mService.create({
      nzTitle: isEdit ? 'Add Sensor ID' : 'Add Panel',
      nzContent: DashboardAddComponent,
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

  bindChart(): void {
    if (ConfigModel.isTest) {
      this.barList = this.mockService.barList;
      this.lineList = this.mockService.lineList;
      this.visitList = this.mockService.visitList;
      this.pieList = this.mockService.pieList;
    } else {
      this.loadChart();
    }
    this.loadingCate = true;
    this.orderService.getBarHorizontalList().subscribe(r => {
      this.loadingCate = false;
      this.barHorizontalList = r;
      this.pipList = this.barHorizontalList.slice(0, 4);
    });
  }

  loadChart(): void {
    this.loadingOrder = true;
    this.loadingUser = true;
    this.loadingDevice = true;
    this.loadingVisit = true;
    this.orderService.getBarList().subscribe(r => {
      this.loadingOrder = false;
      this.barList = r;
    });
    this.userService.getLineList().subscribe(r => {
      this.loadingUser = false;
      this.lineList = r;
    });
    this.logService.getPieList().subscribe(r => {
      this.loadingDevice = false;
      this.pieList = r;
    });
    this.logService.getVisitList().subscribe(r => {
      this.loadingVisit = false;
      const temp = new Array<LineModel>();
      const line = new LineModel({ name: 'Num', series: r });
      temp.push(line);
      this.visitList = temp;
    });
  }

  bindData(): void {
    if (ConfigModel.isTest) {
      this.totalVisits = this.clientSize;
      this.totalUsers = this.mockService.totalUsers;
      this.totalSales = this.mockService.totalSales;
      this.totalOrders = this.mockService.totalOrders;
      this.totalNotices = this.mockService.totalNotices;
      this.totalFavorites = this.mockService.totalFavorites;
    } else {
      this.loadStatistics();
    }
  }

  loadStatistics(): void {
    this.loading = true;
    this.storage.has(ConfigModel.visitKey).subscribe(r => {
      if (r) {
        forkJoin([
          this.storage.get<number>(ConfigModel.visitKey, { type: 'number' }),
          this.storage.get<number>(ConfigModel.userKey, { type: 'number' }),
          this.storage.get<number>(ConfigModel.orderKey, { type: 'number' }),
          this.storage.get<number>(ConfigModel.saleKey, { type: 'number' }),
          this.storage.get<number>(ConfigModel.noticeKey, { type: 'number' }),
          this.storage.get<number>(ConfigModel.favoriteKey, { type: 'number' })]).subscribe(results => {
            this.totalVisits = results[0];
            this.totalUsers = results[1];
            this.totalOrders = results[2];
            this.totalSales = results[3];
            this.totalNotices = results[4];
            this.totalFavorites = results[5];
            this.loading = false;
          });
      } else {
        this.pageService.getList([
          this.logService.getList(),
          this.userService.getList(),
          this.orderService.getList(),
          this.noticeService.getList(),
          this.favoriteService.getList()]).then(results => {
            this.loading = false;
            this.totalVisits = results[0].length;
            this.totalUsers = results[1].length;
            this.totalOrders = results[2].length;
            this.totalSales = +(results[2] as Array<OrderModel>).map(o => o.total).reduce((p, c) => p + c, 0).toFixed(2);
            this.totalNotices = results[3].length;
            this.totalFavorites = results[4].length;

            forkJoin([
              this.storage.set(ConfigModel.visitKey, this.totalVisits),
              this.storage.set(ConfigModel.userKey, this.totalUsers),
              this.storage.set(ConfigModel.orderKey, this.totalOrders),
              this.storage.set(ConfigModel.saleKey, this.totalSales),
              this.storage.set(ConfigModel.noticeKey, this.totalNotices),
              this.storage.set(ConfigModel.favoriteKey, this.totalFavorites)]).subscribe();
          });
      }
    });
  }
}
