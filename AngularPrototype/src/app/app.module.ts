import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoursingComponent} from './pages/coursing/coursing.component';
import {RacingComponent} from './pages/racing/racing.component';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from "@angular/cdk/table";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule, MatNativeDateModule, MatSortModule, NativeDateAdapter} from "@angular/material";
import {MatStepperModule} from '@angular/material/stepper';
import { NgDragDropModule } from 'ng-drag-drop';

[CdkTableModule]
import {FlexLayoutModule} from "@angular/flex-layout";
//import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material";
import {AdminComponent} from './pages/admin/admin.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { DogDialogComponent } from './pages/admin/dialogs/dog-dialog/dog-dialog.component';
import { ExhibitionComponent } from './pages/exhibition/exhibition.component';
import {DogService} from "./services/DogService/dog.service";
import { OwnerDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-dialog.component';
import {AuthService} from "./services/AuthService/auth.service";
import {MatTabsModule} from '@angular/material/tabs';
import {DropdownModule} from 'primeng/primeng';
import { TournamentDialogComponent } from './pages/admin/dialogs/tournament-dialog/tournament-dialog.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import { BreederDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-dialog.component';
import { ClubDialogComponent } from './pages/admin/dialogs/club-dialog/club-dialog.component';
import {BreederService} from "./services/BreederService/breeder.service";
import {ClubService} from "./services/ClubService/club.service";
import {OwnerService} from "./services/OwnerService/owner.service";
import {TournamentService} from "./services/TournamentService/tournament.service";
import { JudgeDialogComponent } from './pages/admin/dialogs/judge-dialog/judge-dialog.component';
import {JudgeService} from "./services/JudgeService/judge.service";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TournamentDogService} from "./services/TournamentDogService/tournamentdog.service";
import {
  CanActivateViaAuthGuard,
  PasswordDialogComponent
} from './pages/admin/dialogs/password-dialog/password-dialog.component';
import { ClubCrudTableComponent } from './pages/admin/club-crud-table/club-crud-table.component';
import { BreederCrudTableComponent } from './pages/admin/breeder-crud-table/breeder-crud-table.component';
import { OwnerCrudTableComponent } from './pages/admin/owner-crud-table/owner-crud-table.component';
import { JudgeCrudTableComponent } from './pages/admin/judge-crud-table/judge-crud-table.component';
import { DogCrudTableComponent } from './pages/admin/dog-crud-table/dog-crud-table.component';
import { TournamentCrudTableComponent } from './pages/admin/tournament-crud-table/tournament-crud-table.component';
import { ManageTournamentsComponent } from './pages/admin/manage-tournaments/manage-tournaments.component';
import { ManageTournamentEvaluationsComponent } from './pages/admin/manage-tournament-evaluations/manage-tournament-evaluations.component';
import { BreederEditDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-edit-dialog/breeder-edit-dialog.component';
import { BreederDeleteDialogComponent } from './pages/admin/dialogs/breeder-dialog/breeder-delete-dialog/breeder-delete-dialog.component';
import { ClubEditDialogComponent } from './pages/admin/dialogs/club-dialog/club-edit-dialog/club-edit-dialog.component';
import { ClubDeleteDialogComponent } from './pages/admin/dialogs/club-dialog/club-delete-dialog/club-delete-dialog.component';
import { OwnerEditDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-edit-dialog/owner-edit-dialog.component';
import { OwnerDeleteDialogComponent } from './pages/admin/dialogs/owner-dialog/owner-delete-dialog/owner-delete-dialog.component';
import {CoursingService} from "./services/CoursingService/coursing.service";
import {SearchService} from "./services/SearchService/search.service";
import { JudgeDeleteDialogComponent } from './pages/admin/dialogs/judge-dialog/judge-delete-dialog/judge-delete-dialog.component';
import {JudgeEditComponent} from "./pages/admin/dialogs/judge-dialog/judge-edit-dialog/judge-edit.component";


const appRoutes: Routes = [
  {path: 'coursing', component: CoursingComponent},
  {path: 'racing', component: RacingComponent},
  {path: 'admin', component: AdminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'exhibition', component: ExhibitionComponent},
  {path: '', redirectTo: 'coursing', pathMatch: 'full'}

];
//{ path: 'hero/:id',      component: HeroDetailComponent },
/*{
    remove your node-modules directory,
    remove the @angular/flex-layout entry in your package.json
    then run terminal npm i; npm i @angular/flex-layout
*/


@NgModule({
  declarations: [
    AppComponent,
    CoursingComponent,
    RacingComponent,
    AdminComponent,
    DogDialogComponent,
    ExhibitionComponent,
    OwnerDialogComponent,
    TournamentDialogComponent,
    BreederDialogComponent,
    ClubDialogComponent,
    JudgeDialogComponent,
    PasswordDialogComponent,
    ClubCrudTableComponent,
    BreederCrudTableComponent,
    OwnerCrudTableComponent,
    JudgeCrudTableComponent,
    DogCrudTableComponent,
    TournamentCrudTableComponent,
    ManageTournamentsComponent,
    ManageTournamentEvaluationsComponent,
    BreederEditDialogComponent,
    BreederDeleteDialogComponent,
    ClubEditDialogComponent,
    ClubDeleteDialogComponent,
    OwnerEditDialogComponent,
    OwnerDeleteDialogComponent,
    JudgeEditComponent,
    JudgeDeleteDialogComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    //NgbModule.forRoot(),
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,


  ],
  entryComponents: [JudgeDeleteDialogComponent, JudgeEditComponent, OwnerDeleteDialogComponent, OwnerEditDialogComponent, ClubDeleteDialogComponent, ClubEditDialogComponent, BreederDeleteDialogComponent,BreederEditDialogComponent, DogDialogComponent,PasswordDialogComponent, OwnerDialogComponent, TournamentDialogComponent, BreederDialogComponent, ClubDialogComponent, JudgeDialogComponent ],
  providers: [NativeDateAdapter, SearchService, CoursingService, TournamentDogService, DogService, CanActivateViaAuthGuard, AuthService, JudgeService, BreederService, ClubService, OwnerService, TournamentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
