import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { register } from '@swc-node/register/register';
import { UserLoginDto } from '@nx-tpdb/shared';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    TranslateModule,
    MatCardContent,
    MatCardActions,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;

  returnUrl: string | null = 'home';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private readonly _fb: FormBuilder
  ) {
    this.loginForm = this._fb.group({
      username: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.returnUrl = params.get('retUrl');
    });
  }

  login() {
    if(this.loginForm && this.loginForm.valid ) {
      const loginRequest: UserLoginDto = {
        username: this.loginForm?.value.username,
        password: this.loginForm?.value.password,
      };
      this.authenticationService.login(loginRequest).subscribe((res) => {
        if (this.returnUrl != null) {
          this.router.navigate([this.returnUrl]).then();
        } else {
          this.router.navigate(['home']).then();
        }
      });
    }

  }

  register() {
    this.router.navigate(['/register']);
  }
}
