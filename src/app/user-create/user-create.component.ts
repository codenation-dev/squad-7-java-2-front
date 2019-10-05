import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TokenService } from '../auth/token.service';
import { HttpDatabaseService } from '../share/services/http-database/http-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  hide = true;
  formulario: FormGroup;

  getErrorMessage() {
    return this.formulario.hasError('required') ? 'Você deve entrar com o e-mail' :
      this.formulario.hasError('email') ? 'E-mail não é válido' :
        this.formulario.hasError('name') ? 'Nome não informado' :
          '';
  }
  constructor(private router: Router
    , private formBuilder: FormBuilder
    , private httpDatabaseService: HttpDatabaseService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  salvar() {

    const dataBody = JSON.stringify(this.formulario.value);
    this.httpDatabaseService
      .save(dataBody)
      .subscribe(
        dados => {
          alert('Usuário Salvo com sucesso!');
          this.router.navigate(['/login']);
        },
        (error: any) => alert(error)
      );
  }

  onSalvar() {
    if (this.formulario.valid) {
      this.salvar();
    } else {
      console.log('formulario invalido');
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

}
