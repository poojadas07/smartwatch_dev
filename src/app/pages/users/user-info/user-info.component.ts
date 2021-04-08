import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../shared/model';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() data: UserModel;

  constructor(private modal: NzModalRef) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.modal.close();
  }

}
