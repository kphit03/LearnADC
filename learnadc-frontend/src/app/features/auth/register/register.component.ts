import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill out ALL fields correctly.');
      return;
    }

    const newUser = this.registerForm.value;

    this.authService.register(newUser).subscribe({
      next: () => {
        this.toastr.success('Registration successful. You can now log in.');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.toastr.error('Registration failed. Email may already be in use.');
      }
    });
  }
}
