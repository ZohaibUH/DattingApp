import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { FileListComponent } from './file-list/file-list.component';
import { ResolveGuard } from './_guards/resolve.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guard/admin.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { StudyFolderComponent } from './OpenFiles/study-folder/study-folder.component';
import { StudyFolderResolver } from './_resolvers/study-folder.resolver';
const routes: Routes = [ 
  {path: '', component :HomeComponent},  
  {path: '', 
       runGuardsAndResolvers: 'always', 
       canActivate: [AuthGuard], 
       children:[ 
        {path: 'members', component : MemberListComponent}, 
        {path: 'members/:username', component :MemberDetailComponent, resolve:{member:MemberDetailedResolver}},  
        {path: 'member/edit', component :MemberEditComponent , canDeactivate:[PreventUnsavedChangesGuard]}, 
        {path: 'lists', component :ListsComponent}, 
        {path: 'messages', component :MessagesComponent}, 
        {path: 'files', component:FileListComponent, resolve:{ data:ResolveGuard}},  
        {path: 'studyfiles', component:StudyFolderComponent,resolve:{ filedata:StudyFolderResolver}},   
        {path: 'admin', component:AdminPanelComponent, canActivate:[AdminGuard]}
       ]
  },
  {path: 'errors', component:TestErrorComponent},  
 
  {path: 'not-found', component:NotFoundComponent}, 
  {path: 'server-error', component:ServerErrorComponent},
  {path: '**', component :NotFoundComponent,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
