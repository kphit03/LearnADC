import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; //helps build the form controls
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { ContactService, ContactRequest } from '../core/contact.service';

@Component({
  selector: 'app-contact',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
  contactForm: FormGroup; //contactForm will hold entire form's structure and state (not initialized here yet)
  submitting = false; //submit loading false until onSubmit triggered

  constructor( //dependency injection
    private fb: FormBuilder,
    private toastr: ToastrService,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({ //initializing contactForm, creates the 4 fields
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], //email only input
      subject: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() { //submit method used in the html
    this.contactForm.markAllAsTouched();
    
    if (this.contactForm.invalid) {//form validation
      this.toastr.error('Please fill out the form correctly.');
      return;
    }

    this.submitting = true; 
    const formData: ContactRequest = this.contactForm.value; //put data into ContactRequest interface that will be sent to backend as a JS object, extracts user input (name, email, subject, message)

    this.contactService.sendContactForm(formData).subscribe({
      next: (response) => { //successful send
        this.toastr.success('Your message was sent successfully!');
        this.contactForm.reset();
        this.submitting = false;
      },
      error: (err) => { //unsuccessful send
        console.error('Failed to send message', err);
        this.toastr.error('An error occurred. Please try again.');
        this.submitting = false;
      }
    });
  }
}