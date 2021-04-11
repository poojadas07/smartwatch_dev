import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/api/admin.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-clientscreen',
  templateUrl: './clientscreen.component.html',
  styleUrls: ['./clientscreen.component.scss']
})
export class ClientscreenComponent implements OnInit {

  gridStyle = {
    textAlign: 'center'
  };
  clients:any = [];
  locationId:any;
  departmentstatus:Boolean = false;
  department:any =[];
  screenstatus:Boolean = false;
  screens: any;
  screensSize: any;

  constructor(private adminService: AdminService, 
              private router:Router,
              private route: ActivatedRoute) {
    this.adminService.fetchAllClients().subscribe((res) => {
      this.clients = res;
      console.log(res);
    });
   }

   

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.locationId = params.get('locationId');
      this.departmentstatus = false;
      this.screenstatus = false;
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

  editRow(panel): void {
    //this.createComponentModal(true, panel);
  }

  getdepartments(clientId:any){
    console.log(clientId);
    this.adminService.fetchDepartmentByClientLocation(clientId,this.locationId).subscribe((response)=>{
      this.department = response;
      this.departmentstatus = true;
      console.log(response);
    })
  }

  getscreens(departmentId:any){
    console.log(departmentId);

    this.adminService.fetchScreenByDepartmentName(departmentId).subscribe((res) => {
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

    this.screenstatus = true;
  }

}
