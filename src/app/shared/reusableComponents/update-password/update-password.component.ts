import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Form is valid, proceed with password change
      const passwordData = this.passwordForm.value;
      if (passwordData.newPassword === passwordData.confirmPassword) {
        this.userService.changePassword(passwordData).subscribe(
          (response) => {
            // Handle success, e.g., show a success message
            alert('Password changed successfully');
            this.userService.removeToken();
            this.router.navigate(['']);
          },
          (error) => {
            // Handle error, e.g., display an error message
            alert('Error changing password');
          }
        );
      } else {
        // Handle password mismatch error
        alert('New password and confirm password do not match');
      }
    } else {
      // Form is invalid, show validation errors
      alert('Form is invalid. Please check the fields.');
    }
  }
}

