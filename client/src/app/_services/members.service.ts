import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/members';
import { PaginatedResult } from '../_models/Paginaton'; 
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams'; 
import { AccountService } from './account.service';
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
  constructor(private http: HttpClient, private accountService: AccountService) { 
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
    let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize); 
    params=params.append('minAge',userParams.minAge);  
    params=params.append('maxAge',userParams.maxAge);  
    params=params.append('gender',userParams.gender);  
    params=params.append('orderBy',userParams.orderBy); 

  //  if(this.members.length>0) return of(this.members);
     return this.getPaginatedResult<Member[]>(this.baseUrl+'users',params).pipe( 
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
   
    return this.http.get(this.baseUrl + 'process',{ responseType: 'text'}) 
    
  } 
  updatefilename( filename:string)
  {  
     console.log("ok"+filename);
    return this.http.get(this.baseUrl + 'process/'+filename,{ responseType: 'text'}) .subscribe(
      val => {
          console.log("PUT call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PUT call in error", response);
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
  private getPaginatedResult<T>(url: string ,params: HttpParams) { 
    const paginatedResult: PaginatedResult<T>=new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;

        }
        const pagination = response.headers.get('pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber: number,pageSize:number) {
    let params = new HttpParams; // allows us to set query string parameters along with our HTTP request. 
 
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
   
    return params;
  }
}