import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TokenService } from '../auth/token.service';
import { HttpDatabaseService } from '../share/services/http-database/http-database.service';
import { Router } from '@angular/router';

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
    , private router: Router
    , private tokenService: TokenService
    , private formBuilder: FormBuilder
    , private httpDatabaseService: HttpDatabaseService) { }

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

  forgot() {
    if (this.formulario.get('email').valid) {
      this.httpDatabaseService.forgot(this.formulario.get('email').value)
        .subscribe(
          reponse => alert('Nova senha enviada para o seu e-mail'),
          (error: any) => alert(error)
        );
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  registre() {
    this.router.navigate(['/user-create']);
  }
}

