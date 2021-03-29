import {Component, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {AuthService, LogService} from '../shared/services/firebase-api';
import {LogModel} from '../shared/model';
import {DatePipe} from '@angular/common';


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
      title: 'nav.reports', icon: 'home', child:
      [
        
      ]
    },
  ];

  constructor(private router: Router,
              private datePipe: DatePipe,
              private logService: LogService,
              private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
      }
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
