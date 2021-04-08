import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubCateModel, SubCateService} from '../../../shared';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-sub-cate-add',
  templateUrl: './sub-cate-add.component.html',
  styleUrls: ['./sub-cate-add.component.scss']
})
export class SubCateAddComponent implements OnInit {
  subForm: FormGroup;
  @Input() isEdit;
  @Input() data: SubCateModel;
  isLoading = false;
  imgUrl = null;


  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private datePipe: DatePipe,
              private subCateService: SubCateService) {
    this.subForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      sort: [1, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.subForm.get('name').setValue(this.data.name);
      this.subForm.get('sort').setValue(this.data.sort);
      this.imgUrl = this.data.img;
    }
  }

  down(event): void {
    this.imgUrl = event;
  }

  cancel(): void {
    this.modal.destroy(false);
  }

  onOk(): void {
    this.isLoading = true;
    const model = new SubCateModel();
    model.name = this.subForm.controls.name.value;
    model.sort = +this.subForm.controls.sort.value;
    model.img = this.imgUrl;
    model.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    if (this.isEdit) {
      model.id = this.data.id;
      this.subCateService.update(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    } else {
      this.subCateService.addModel(model).then(() => {
        this.isLoading = false;
        this.modal.close(true);
      });
    }
  }
}
