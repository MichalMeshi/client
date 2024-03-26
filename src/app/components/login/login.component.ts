import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgToastService  } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toast: NgToastService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          console.log({res});
          localStorage.setItem('userId', res.userId); // Store user ID in local storage
          this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 })
          this.router.navigate(['']);
        },
        error: (err) => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong:(", duration: 5000 })
        }
      })
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
