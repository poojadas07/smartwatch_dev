import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderLanguageComponent } from './header-language/header-language.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    new HeaderLanguageComponent(this.translate);
  }
}
