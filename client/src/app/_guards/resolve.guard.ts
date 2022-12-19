import { Injectable } from '@angular/core';
import { Resolve ,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> { 
  constructor(private memberService:MembersService){ 

  }
  resolve(){ 
return this.memberService.getFiles();
  }
  
}
