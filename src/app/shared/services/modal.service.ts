import {Injectable} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';


@Injectable({providedIn: 'root'})
export class ModalService {
  constructor(private modalService: NzModalService) {
  }

  info(msg: string): void {
    this.modalService.info({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  success(msg): void {
    this.modalService.success({
      nzTitle: 'Success',
      nzContent: msg
    });
  }

  error(msg): void {
    this.modalService.error({
      nzTitle: 'Info',
      nzContent: msg
    });
  }

  warning(msg): void {
    this.modalService.warning({
      nzTitle: 'Warning',
      nzContent: msg
    });
  }

  confirm(msg: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const modal = this.modalService.confirm({
        nzTitle: 'Confirm',
        nzContent: msg,
        nzOkText: 'OK',
        nzCancelText: 'Cancel',
        nzOnCancel: () => {
          modal.close(false);
          resolve(false);
        },
        nzOnOk: () => {
          modal.close(true);
          resolve(true);
        },
      });
    });
  }
}
