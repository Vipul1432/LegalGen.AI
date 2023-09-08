import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms'; // Import these modules
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm !: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      // Implement your reset password logic here
      const emailControl = this.resetPasswordForm.get('email');

  if (emailControl) {
    const email = emailControl.value;

    this.userService.forgetPassword(email).subscribe(
      (response) => {
        // Handle success, e.g., show a success message
        alert('Email sent successfully. Check your email to reset your password.');
        this.router.navigate(["/login"]);
      },
      (error) => {
        // Handle error, e.g., display an error message
        console.error('Error sending email', error);
      }
    );
  } else {
    // Handle the case where form controls are invalid or not found
    // You can display an error message or handle it as needed
    console.error('Invalid form data or form controls not found.');
  }
    }
  }
}
