import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/firebase-api';
import {UserModel} from '../../shared/model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: UserModel;

  constructor(private authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }

}
