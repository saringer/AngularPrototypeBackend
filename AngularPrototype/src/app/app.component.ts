import {Component, Injectable, OnInit} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./services/AuthService/auth.service";
import {MatDialog} from "@angular/material";
import {PasswordDialogComponent} from "./pages/admin/dialogs/password-dialog/password-dialog.component";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}






  onAdminLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/racing']);

}

  onAdminLoginClick() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    //this.authenticate();
  }

  authenticate() {
    this.authService.login();
   // this.isAdmin = true;
  }
  isLoggedIn() {
    this.authService.isLoggedIn();
  }


}

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {


  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isLoggedIn();
  }

}


