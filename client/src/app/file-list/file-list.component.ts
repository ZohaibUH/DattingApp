import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';
import { Observable } from 'rxjs';
import { ActivatedRoute ,Route,Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  baseUrl= environment.apiUrl;   
  Gettingfiles: string | undefined; 
  tableArray: any;  
  name:string | undefined;
  elementendNumber: number;
  tableArrayRows: any[] = []; 
  tableRow: any[] = [];
  filenumber: string;
  tableRows: any[] = []; 
  filename : string |undefined;
  members$:Observable<string> | undefined;
  constructor(private memberService:MembersService,private toastr:ToastrService, 
     private activateRoute:ActivatedRoute, private router:Router,private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void { 
 
  
    this.getfiles(); 
    

  } 
   getfiles() 
  {  
    
   /*
  //this.memberService.getFiles().subscribe(   res => { 
    this.Gettingfiles=this.activateRoute.snapshot.data['data'];   
   
    this.Gettingfiles = this.Gettingfiles.replace(/\"/g, '');
    this.tableArray = this.Gettingfiles.split(/\r?\n/);
    //console.log(  this.Gettingfiles);
    // Table body row
    this.tableRows = this.tableArray.splice(0, this.tableArray.length); 
    //console.log( this.tableRows );
    this.tableRows = this.tableRows.map(x => x.split(',')); 
    //this.tableRows=this.tableArrayRows.splice(this.tableArrayRows.length, 1);
   // this.Gettingfiles=this.Gettingfiles.replace(/\"/g, '');
   // console.log(this.tableRows.splice(this.tableRows.length-1,1));  
    
      //err=> console.log(err)
  //}); 
 */ 
  this.Gettingfiles=this.activateRoute.snapshot.data['data'] ; 
  this.tableArray= this.Gettingfiles.split("[");
    
  // Table body row
  this.tableRows = this.tableArray.splice(1, this.tableArray.length); 
 // console.log( this.tableRows );
 this.tableRows = this.tableRows.map(x => x.split(' '));   
   console.log(this.tableRows); 
   
  } 
  deleteFile( path: string) 
  {  
   
  // this.filename = path.split(/[\\]/).pop(); 
   this.memberService.updatefilename(path); 
  }  
  reload() 
  { 
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  test(i: number){
    this.elementendNumber=++i; 
    
 } 


}
