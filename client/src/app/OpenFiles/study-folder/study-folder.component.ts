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
  searchPdf: string=".pdf";
  tableRows: any[] = []; 
  index: number;  
  name:string | undefined;
  elementendNumber: number;
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
   console.log(path)
   this.fileService.closeFile(path);
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
