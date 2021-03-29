import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd/upload';
import {AngularFireStorage} from '@angular/fire/storage';
import {GoodPhotoModel, GoodPhotoService} from '../../../shared';
import {combineLatest} from 'rxjs';

export class File {
  uid: string;
  name: string;
  status: string;
  url: string;
  thumbUrl: string;
}

@Component({
  selector: 'app-good-photo',
  templateUrl: './good-photo.component.html',
  styleUrls: ['./good-photo.component.scss']
})
export class GoodPhotoComponent implements OnInit {
  basePath = 'uploads';
  @Input() id: string;
  fileList: Array<File>;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string;
  previewVisible = false;
  photoList: Array<GoodPhotoModel>;

  constructor(private modal: NzModalRef,
              private storage: AngularFireStorage,
              private photoService: GoodPhotoService) {

  }

  ngOnInit(): void {
    this.photoService.getListByParam('goodId', this.id).subscribe(result => {
      this.photoList = result;
      if (this.photoList && this.photoList.length > 0) {
        this.photoList.map(p => {
          this.fileList = [];
          this.fileList.push({uid: p.id, name: p.imgName, status: 'done', url: p.img, thumbUrl: ''});
        });
      } else {
        this.fileList = [];
        console.log(this.fileList);
      }
    });

  }

  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  onClose() :void{
    this.modal.close(true);
  }

  private deleteFileStorage(path: string): void {
    this.storage.ref(path).delete().subscribe();
  }

  customRemove = (file: NzUploadFile) => {
    const index = this.fileList.findIndex(f => f.name === file.name);
    this.fileList.splice(index, 1);
    const path = `${this.basePath}/${file.name}`;
    combineLatest([this.photoService.delete(file.uid), this.storage.ref(path).delete()]).subscribe(r => {
      console.log('img delete');
    });
  };

  customReq = (item: NzUploadXHRArgs) => {
    const fileName = item.file.name;
    const path = `${this.basePath}/${fileName}`;
    const task = this.storage.upload(path, item.file);
    return task.then(snapshot => snapshot.ref.getDownloadURL())
      .then((url) => {
        this.photoService.addModel({goodId: this.id, imgName: fileName, img: url}).then(r => {
          const index = this.fileList.findIndex(f => f.name === fileName);
          if (index > -1) {
            this.fileList[index].uid = r.id;
          }
        });
        item.onSuccess({}, item.file, {});
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      });
  };
}
