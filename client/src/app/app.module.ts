import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component'; 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { Toast, ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { FileListComponent } from './file-list/file-list.component';
import { ResolveGuard } from './_guards/resolve.guard';
import { FooterComponent } from './footer/footer.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directive/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { StudyFolderComponent } from './OpenFiles/study-folder/study-folder.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component'; 
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http'; 
import { importProvidersFrom } from '@angular/core';
import { AuthModule, LogLevel, OidcSecurityService,OpenIdConfiguration } from 'angular-auth-oidc-client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleFilesComponent } from './schedule-files/schedule-files.component';



// ...

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    FileListComponent,
    FooterComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    MemberMessagesComponent,
    StudyFolderComponent,
    ConfirmDialogComponent,
    ScheduleFilesComponent 
  ], 
  
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,  
    BrowserAnimationsModule, 
    FormsModule,  
    SharedModule,   
    AuthModule.forRoot({
      config: {
        authority: 'https://accountsvr.itr.itrlab.com/',
        redirectUrl: 'https://localhost:4200/',
        postLogoutRedirectUri: 'https://localhost:4200/',
        clientId: 'fileunlock',
        scope: 'openid profile fileunlockapi', 
        responseType: 'id_token token',
        silentRenew: true,
        useRefreshToken: true,
        logLevel: LogLevel.Debug, 
        
      },
    }), NgbModule,
    
  ], 
  exports:[   
    
  ],
  providers: [  
    {provide:HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi: true},  
    {provide:HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},
    {provide:HTTP_INTERCEPTORS,useClass: LoadingInterceptor, multi: true}, 
    ResolveGuard

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(public oidcSecurityService: OidcSecurityService) { 
    
  }
 }


