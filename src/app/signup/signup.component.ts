import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLinear = false;
  secondFormGroup!: FormGroup;
  loading: boolean = false;
  formArray!: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastService: ToastService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    this.secondFormGroup = this.formBuilder.group({
      // name: ['',Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  get email() {
    return this.signupForm?.get('email');
  }
  get name() {
    return this.signupForm?.get('name');
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
    this.loading = true;
    const data = {
      ...this.signupForm.value,
      ...this.secondFormGroup.value
    }
    this.apiService.register(data).subscribe(
      (response) => {
        // const parsedResponse = JSON.parse(response);
        // Handle successful response
        this.toastService.showSuccess(response['message']);
        // console.log(response);
        this.loading = false;
      },
      (error) => {
        // Handle error response
        this.loading = false;
        this.toastService.showError(error['error']);
        // console.error(error);
      }
    );
  }
  submitRegistration() {
    this.onSubmit();
  }

  onStepChange(event: any) {
    // Reset form validation upon step change
    if (event.selectedIndex === (event.steps?.length ?? 0) - 1) {
      this.signupForm.markAllAsTouched();
      this.secondFormGroup.markAllAsTouched();
    }
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
