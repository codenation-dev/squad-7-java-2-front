import { Component } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authGuardService: AuthGuardService) { }

  logOff() {
    this.authGuardService.logout();
  }

  isAuthenticated(): boolean {
    return this.authGuardService.hasToken();
  }

  token() {
    return this.authGuardService.checkCredentials();
  }

  getUsuario() {
    return this.authGuardService.getUsuario();
  }

}
