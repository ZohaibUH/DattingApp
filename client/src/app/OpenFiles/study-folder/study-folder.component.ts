import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { ActivatedRoute ,Route,Router} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MembersService } from 'src/app/_services/members.service';
import { FilesService } from 'src/app/_services/files.service';
import { Console } from 'console';

@Component({
  selector: 'app-study-folder',
  templateUrl: './study-folder.component.html',
  styleUrls: ['./study-folder.component.css']
})
export class StudyFolderComponent implements OnInit{  
  Gettingfiles: string | undefined;  
  tableArray: any;
  tableArrayRows: any[] = [];
  filename: string | undefined;
  tableRows: any[] = [];
  constructor(private memberService:MembersService,private fileService:FilesService,private toastr:ToastrService, 
    private activateRoute:ActivatedRoute, private router:Router,private ngxService: NgxUiLoaderService) { }
  ngOnInit(): void {
    
    this.getFolderFiles()
  } 
  getFolderFiles() 
  {   
    this.Gettingfiles=this.activateRoute.snapshot.data['filedata'] ; 
   // console.log(  this.Gettingfiles);
    this.tableArray= this.Gettingfiles.split("[");
    
    // Table body row
    this.tableRows = this.tableArray.splice(1, this.tableArray.length); 
   // console.log( this.tableRows );
   this.tableRows = this.tableRows.map(x => x.split(' '));  
    
    console.log(this.tableRows); 
  } 
  deleteFile( path: string) 
  { 
    //var filename = ((document.getElementById("Filename") as HTMLInputElement).value); 
   //this.filename = path.split(/[\:]/).pop();
   console.log(path)
     this.fileService.closeFile(path);
  // this.memberService.updatefilename(this.filename);  
   //window.location.reload();
    //.subscribe({ 
      //next:_ =>{ 
        //this.toastr.success('Profile Upadted Successfully'); 
      
        //}
    //})
  }

}
