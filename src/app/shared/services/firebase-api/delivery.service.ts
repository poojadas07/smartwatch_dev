import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {DeliveryModel} from '../../model';
import {MyError} from './my-error';
import {BaseService} from './base.service';
import {NzModalService} from 'ng-zorro-antd/modal';

@Injectable({providedIn: 'root'})
export class DeliveryService extends BaseService<DeliveryModel> {
  constructor(public db: AngularFirestore,
              public myErr: MyError,
              public modalService: NzModalService) {
    super(db, myErr, 'delivery', modalService);
  }
}

