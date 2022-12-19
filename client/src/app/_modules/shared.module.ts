import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr'; 
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { PaginationModule } from 'ngx-bootstrap/pagination'; 
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
const ngxUiLoaderConfig: NgxUiLoaderConfig = 
{
  "bgsColor": "#3f51b5",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#3f51b5",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "square-jelly-box",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#3f51b5",
  "pbDirection": "ltr",
  "pbThickness": 5,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    BsDropdownModule.forRoot(),  
    TabsModule.forRoot(),
    ToastrModule.forRoot({ 
    positionClass: 'toast-bottom-right'
    }) , 
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxGalleryModule ,
    FileUploadModule, 
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(), 
    PaginationModule.forRoot(), 
    ButtonsModule.forRoot(), 
    TimeagoModule.forRoot()
  ], 
  exports:[ 
    BsDropdownModule,  
    ToastrModule, 
    TabsModule, 
    NgxGalleryModule, 
    NgxUiLoaderModule , 
    FileUploadModule,
    ReactiveFormsModule, 
    BsDatepickerModule,
    PaginationModule, 
    ButtonsModule,
    TimeagoModule
  ]
})
export class SharedModule { }
