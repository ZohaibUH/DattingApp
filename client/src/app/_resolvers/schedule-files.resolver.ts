import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ScheduleFilesService } from '../_services/schedule-files.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFilesResolver implements Resolve<any> { 
  constructor(private scheduleservice: ScheduleFilesService ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.scheduleservice.getFiles();
  }
}
