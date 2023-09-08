import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  updateProfile!: FormGroup;

  user: any;
  emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.updateProfile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      organization: ['', Validators.required],
      contactDetails: ['', Validators.required],
    });
  }

  updateForm(formData: any) {
    if (this.updateProfile.valid) {
      // Call the UserService to update the profile
      this.userService.updateProfile(formData).subscribe(
        (response) => {
          // Handle successful profile update, e.g., show a success message
          console.log('Profile updated successfully', response);
        },
        (error) => {
          // Handle error, e.g., display an error message
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
