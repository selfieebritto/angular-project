
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private apiService: ApiService,private toastService: ToastService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    // this.loading = true;
    const data = this.loginForm.value;
    this.apiService.login(data).subscribe(
      (response) => {
        // const parsedResponse = JSON.parse(response);
        // Handle successful response
        this.toastService.showSuccess(response['message']);
        // console.log(response);
        // this.loading = false;
      },
      (error) => {
        // Handle error response
        // this.loading = false;
        this.toastService.showError(error['error']);
        // console.error(error);
      }
    );

    // Perform login logic here
  }
}

