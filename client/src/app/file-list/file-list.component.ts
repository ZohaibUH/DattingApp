import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from '../_services/members.service';
import { Observable } from 'rxjs';
import { ActivatedRoute ,Route,Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  baseUrl= "https://localhost:5001/api/";   
  Gettingfiles: string | undefined; 
  tableArray: any;
  tableArrayRows: any[] = [];
  filename: string | undefined;
  tableRows: any[] = [];
  members$:Observable<string> | undefined;
  constructor(private memberService:MembersService,private toastr:ToastrService, 
     private activateRoute:ActivatedRoute, private router:Router,private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void { 
    
    this.getfiles(); 
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

  } 
  getfiles() 
  {  
     
   
  //this.memberService.getFiles().subscribe(   res => { 
    this.Gettingfiles=this.activateRoute.snapshot.data['data'];  
    this.Gettingfiles = this.Gettingfiles.replace(/\"/g, '');
    this.tableArray = this.Gettingfiles.split(/\r?\n/);
   
    // Table body row
    this.tableRows = this.tableArray.splice(1, this.tableArray.length);
    this.tableRows = this.tableRows.map(x => x.split(',')); 
    //this.tableRows=this.tableArrayRows.splice(this.tableArrayRows.length, 1);
   // this.Gettingfiles=this.Gettingfiles.replace(/\"/g, '');
    console.log(this.tableRows.splice(this.tableRows.length-1,1)); 
      //err=> console.log(err)
  //}); 
 
    
  } 
  deleteFile( path: string) 
  { 
    //var filename = ((document.getElementById("Filename") as HTMLInputElement).value); 
   this.filename = path.split(/[\\]/).pop();

     
   this.memberService.updatefilename(this.filename);  
   window.location.reload();
    //.subscribe({ 
      //next:_ =>{ 
        //this.toastr.success('Profile Upadted Successfully'); 
      
        //}
    //})
  }

}
