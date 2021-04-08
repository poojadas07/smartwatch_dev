import {Component, Input, OnInit} from '@angular/core';
import {GoodReviewsModel, UserModel} from '../../../shared/model';
import {GoodReviewsService, UsersService, PageDataService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-good-reviews',
  templateUrl: './good-reviews.component.html',
  styleUrls: ['./good-reviews.component.scss']
})
export class GoodReviewsComponent implements OnInit {
  @Input() id: string;
  list: Array<GoodReviewsModel>;
  userList: Array<UserModel>;

  constructor(private gService: GoodReviewsService,
              private userService: UsersService,
              private pageService: PageDataService,
              private modal: NzModalRef) {
  }

  ngOnInit(): void {
    this.pageService.getList([this.gService.getListByParam('goodId', this.id), this.userService.getList()]).then(results => {
      this.list = results[0];
      this.userList = results[1];
      this.list = this.list.map(g => {
        const name = this.userList.find(u => u.uid === g.uid).name;
        return new GoodReviewsModel({userName: name, ...g});
      });
    });
  }

  onClose(): void {
    this.modal.close(true);
  }

}
