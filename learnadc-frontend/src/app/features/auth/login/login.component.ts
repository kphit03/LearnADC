import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup; //represents form structure

  //injects services
  constructor(
    private fb: FormBuilder, // "store this property of the class so i can use it later"
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {

    // Initialize the form (CALLED IN OUR HTML)
    this.loginForm = this.fb.group({ //this.fb.group builds a form with controls
      email: ['', [Validators.required]], //ensures field isn't empty, both email and password are currently intialized with empty strings
      password: ['', Validators.required]
    });
  }

  onSubmit() { //on form submission for login
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all fields correctly');
      return;
    }

    const credentials = this.loginForm.value; //extracts the values from the form into a plain js object like "{ email: 'abc@x.com', password: '12345' }"

    this.authService.login(credentials).subscribe({ //calls backend with our authService login() method. Passes our credentials JSON object to the back end and waits for the response (.subscribe() waits for the response)

      //if login succeeds, show a success toast and redirect
      next: () => { 
        const token = this.authService.getToken();
        if (token) {
          const payload = this.parseJwt(token);
          const roles = payload?.roles || [];

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard'])
          }
        }
        this.toastr.success('Login successful');
      },

      //if login fails, catch the error and show a failure toast
      error: (err) => {
        console.error(err);
        this.toastr.error('Login failed. Check credentials.');
      }
    });
  }

  private parseJwt(token: string): any {
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }
}