import { Injectable } from '@angular/core';
import { Resolve ,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> { 
  constructor(private memberService:MembersService,private ngxService: NgxUiLoaderService){ 

  }
   resolve(){  
          return this.memberService.getFiles(); 

  }
  
}
