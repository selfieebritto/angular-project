import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  get email() {
    return this.signupForm?.get('email');
  }

  get password() {
    return this.signupForm?.get('password');
  }

  get confirmPassword() {
    return this.signupForm?.get('confirmPassword');
  }

  onSubmit() {
    if (this.signupForm?.invalid) {
      return;
    }

    const data = this.signupForm.value;

    this.apiService.register(data).subscribe(
      response => {
        // Handle successful response
        console.log(response);
      },
      error => {
        // Handle error response
        console.error(error);
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ match: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
}
