import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthService, LogService} from '../shared/services/firebase-api';
import {LogModel} from '../shared/model';
import {DatePipe} from '@angular/common';
import { AdminService } from 'src/app/shared/services/api/admin.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  navList = [
    {
      title: 'nav.home', icon: 'home', child:
      [
        {title: 'nav.dashboard', url: '/'},
      ]
    },
    {
      title: 'nav.notice', icon: 'user', isOpen: false, child:
        [
          {title: 'Operators', url: '/pages/operator'},
          {title: 'nav.countries', url: '/pages/country'},
          {title: 'nav.regions', url: '/pages/region'},
          {title: 'nav.locations', url: '/pages/location'},
          {title: 'nav.clients', url: '/pages/client'},
          {title: 'nav.departments', url: '/pages/department'},
          {title: 'nav.screens', url: '/pages/screen'},
        ]
    },
    {
      title: 'nav.reports', icon: 'home'
    },
  ];
  countries:any = [];
  locations:any;
  regions:any;
  departments:any;
  contries_data:any = [];
  
  constructor(private router: Router,
              private datePipe: DatePipe,
              private logService: LogService,
              private authService: AuthService,
              private adminService: AdminService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
    });

    this.adminService.fetchAllContries().subscribe((res) => {
      this.countries = res;
      //console.log(res);
      for(let country of this.countries){
        let region:any = [];
        this.adminService.fetchRegionByCountryName(country.countryId).subscribe((res1) => {
            if(res1.length != 0){
              this.regions = res1;
              for(let tempregion of this.regions){
                let location:any = [];
                this.adminService.fetchLocationByRegionName(tempregion.regionId).subscribe((res2) => {
                    if(res2.length !=0){
                      this.locations = res2;
                      for(let templocation of this.locations){
                        
                        location.push({
                          locationName : templocation.locationName,
                          locationId : templocation.locationId,
                          //department : department
                        });
                      };
                    }
                    region.push({
                      regionName : tempregion.regionName,
                      regionId : tempregion.regionId,
                      location : location
                    })
                  }); 
              }
            }
            this.contries_data.push({
              countryName : country.countryName,
              countryId : country.countryId,
              regions : region
            });
        },
        (error)=>{
          alert('Countries API Error Occurred Check the console and Contact Backend Team');
          console.log(error);
        }); 
      }  
    });

    console.log(this.contries_data);

    this.adminService.fetchAllRegions().subscribe((res) => {
      this.regions = res;
    });
    this.adminService.fetchAllLocations().subscribe((res) => {
      this.locations = res;
    });

  }

  ngOnInit(): void {
  }

  addLog(): void {
    const log = new LogModel();
    log.userId = this.authService.user.uid;
    log.device = this.authService.device;
    log.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.logService.addLog(log);
  }
}
