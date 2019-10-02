import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TokenService } from '../auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  formulario: FormGroup;

  getErrorMessage() {
    return this.formulario.hasError('required') ? 'Você deve entrar com o e-mail' :
      this.formulario.hasError('email') ? 'E-mail não é válido' :
        '';
  }
  constructor(private authGuardService: AuthGuardService
    , private tokenService: TokenService
    , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tokenService.removeToken();

    this.formulario = this.formBuilder.group({
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }


  LogOn() {
    this.authGuardService.retrieveToken(this.formulario.get('email').value, this.formulario.get('password').value);
  }

}

