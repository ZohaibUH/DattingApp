import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFilesService {
  baseUrl=environment.apiUrl; 
  constructor(private http: HttpClient,private toastr: ToastrService) { } 
  getFiles():Observable<any>
  {  
  
   return this.http.get(this.baseUrl + 'schedule',{ responseType: 'text'}).pipe(
   timeout(10000),
      catchError( err => {  
        this.toastr.error("Server is slow and not responding.Please try again Later ");
       //this.router.navigateByUrl('/'); 
        return throwError("Timeout has occurred");
      }));
    

    
  }  
  closeFile( filename:string)
  {   
    return this.http.get(this.baseUrl + 'schedule/'+filename,{ responseType: 'text'}) .pipe(timeout(10000)).subscribe(
       response => {  
       
        setTimeout( () => {  window.location.reload();}, 1500 );
          console.log("PUT call successful value returned in body", 
                      response);
      },
      (error) => {  
        this.toastr.error("Server is slow and not closing the file.Please try again Later ");
        //this.router.navigateByUrl('/');
          console.log("PUT call in error", error);
      },
      () => {
          console.log("The PUT observable is now completed.");
      }
  );
 
  } 
}
