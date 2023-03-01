import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { ToastrService } from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   model: any={} 
   // Auto log out 
   public isCollapsed=true;
   userActivity: any;
   isUserActive: boolean;
   user?: User = {} ;
   @HostListener('window:mousemove') refreshUserState() {
     if (!this.isUserActive) {
       console.log('User is now Active');
       this.isUserActive = true;
       
     }
     clearTimeout(this.userActivity);
     this.setInactivity();
   }
 
   @HostListener('window:keydown', ['$event'])
   keyEvent(event: KeyboardEvent) {
     if (!this.isUserActive) {
       console.log('User is now Active');
       this.isUserActive = true;
       
     }
     clearTimeout(this.userActivity);
     this.setInactivity();
   }
  
      constructor(public  accountService: AccountService, private router: Router,  
      private toastr: ToastrService,public oidcSecurityService: OidcSecurityService) { 
       }

  ngOnInit(): void { 
    this.oidcSecurityService.checkAuth().subscribe(({  isAuthenticated, userData, accessToken, idToken }) => {  
    
  
      if(isAuthenticated)  
      {  
            this.user.username=userData["preferred_username"];  
            this.user.knownAs=userData["name"]; 
            this.accountService.verifyProfile(this.user);
      //  this.loginn();
      } 


    });  
  }  
  
  login() 
  { 
    this.accountService.login(this.model).subscribe({next: _=>  
      {  
        this.router.navigateByUrl('/') ; 
        this.model={};
      }, 
      error: error=> this.toastr.error(error.error)     
  })
    
  }  
  logout() 
  {  
    this.accountService.logout();
    this.router.navigateByUrl('/');

  } 

  loginn() {  
      
      this.oidcSecurityService.authorize();  
      
  }

  logoutt() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));  
    this.router.navigateByUrl('/');
  
  } 
  private setInactivity() {
    this.userActivity = setTimeout(() => {
      console.log('User is now Inactive')
      this.isUserActive = false;
      if (this.oidcSecurityService.isAuthenticated) {
      console.log('You have been logged out of Master Schedule due to inactivity.');
        this.logoutt(); 
        this.router.navigateByUrl('/') ;
      }
    }, 1800000); //1800000
  }
}
