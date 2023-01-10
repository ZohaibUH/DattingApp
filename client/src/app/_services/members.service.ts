import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, take, tap, timeout } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/members';
import { PaginatedResult } from '../_models/Paginaton'; 
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams'; 
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;   
  members: Member[]=[]; 
  memberCache =new Map();
  user: User |undefined; 
  userParams: UserParams | undefined; 
  
  var:string;
  router: any;
  constructor(private http: HttpClient, private accountService: AccountService,private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({ 
      next: user=>{ 
        if(user){ 
          this.userParams=new UserParams(user) 
          this.user=user;
        }
      }
    })
   }  
   getUserParams() 
   { 
      return this.userParams;
   } 
   setUserParams(params: UserParams) { 
    this.userParams=params; 
   } 
   resetUserParams() 
   { 
      if(this.user){ 
        this.userParams=new UserParams(this.user); 
        return this.userParams;
      } 
      return;
   }
  getMembers(userParams: UserParams) 
  {    
    const response =this.memberCache.get(Object.values(userParams).join('-')); 
    if(response) return of(response);
    let params = getPaginationHeaders(userParams.pageNumber,userParams.pageSize); 
    params=params.append('minAge',userParams.minAge);  
    params=params.append('maxAge',userParams.maxAge);  
    params=params.append('gender',userParams.gender);  
    params=params.append('orderBy',userParams.orderBy); 

  //  if(this.members.length>0) return of(this.members);
     return getPaginatedResult<Member[]>(this.baseUrl+'users',params,this.http).pipe( 
      map(response=>{ 
        this.memberCache.set(Object.values(userParams).join('-'),response); 
        return response;
      })
     )
  }  
 
  getMember(username: string) 
  {   
    const member =[...this.memberCache.values()].reduce((arr,elem) => arr.concat(elem.result),[]) 
                  .find((member:Member)=> member.userName=== username);  
    if(member) return of(member);
    
   // const member=this.members.find(x=>x.userName==username); 
    //if(member) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  } 
  updateMember(member:Member) 
  { 
    return this.http.put(this.baseUrl+'users',member).pipe( 
     map(()=>{ 
         const index=this.members.indexOf(member); 
         this.members[index]={...this.members[index],...member}
     })
    )
  } 
   getFiles():Observable<any>
  {   
    
    return this.http.get(this.baseUrl + 'process',{ responseType: 'text'}) .pipe(
   timeout(15000),
      catchError( err => {  
        this.toastr.error("Server is slow and not responding.Please try again Later ");
       this.router.navigateByUrl('/'); 
        return throwError("Timeout has occurred");
      }));
    

    
  } 
  updatefilename( filename:string)
  {  
     console.log("ok"+filename);
    return this.http.get(this.baseUrl + 'process/'+filename,{ responseType: 'text'}) .pipe(timeout(10000)).subscribe(
      response => { 
        window.location.reload();  
        
       // this.toastr.error("Selected file has been deleted ");
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
  setMainPhoto(photoId: number) 
  {  
  
    return this.http.put(this.baseUrl+'users/set-main-photo'+photoId,{});
  } 
  deletePhoto(photoId:number) 
  { 
    return this.http.delete(this.baseUrl + 'users/delete-photo' +  photoId);
  }  
  addLike(username: string){ 
    return this.http.post(this.baseUrl+'likes/'+username,{});
  } 
  getLikes(predicate: string, pageNumber: number,pageSize:number){  
    let params =getPaginationHeaders(pageNumber,pageSize); 
    params=params.append('predicate',predicate);
   // return this.http.get<Member[]>(this.baseUrl+'likes?predicate='+predicate); 
   return getPaginatedResult<Member[]>(this.baseUrl+'likes',params, this.http)
  }
  

}