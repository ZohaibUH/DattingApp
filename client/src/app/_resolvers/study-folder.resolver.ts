import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilesService } from '../_services/files.service';


@Injectable({
  providedIn: 'root'
})
export class StudyFolderResolver implements Resolve<any> { 
  constructor(private fileService:FilesService){ 
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.fileService.getFiles();
  }
}
