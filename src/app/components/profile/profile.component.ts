import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: string; // Assuming you have a way to get the user ID
  userDetails: any = {
    name: '',
    email: ''
  }
  editMode: boolean = false;

  constructor(private authService: AuthService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;

    // Fetch user details from the server
    this.authService.getUser(this.userId).subscribe({
      next: (res) => {
        this.userDetails.name = res.name;
        this.userDetails.email = res.email;
      },
      error: (error) => {
        this.toast.error({ detail: "ERROR", summary: "Something went wrong:(", duration: 5000 })
      }
    });
  }

  editProfile() {
    if (this.editMode) {
      // Update user details on the server
      const updatedDetails = this.userDetails;
      this.authService.editProfile(this.userId, updatedDetails).subscribe({
        next: (data) => {
          this.ngOnInit();
          this.editMode = false;
          this.toast.success({ detail: "SUCCESS", summary: "Profile Update Successfully", duration: 5000 })
        },
        error: (error) => {
          this.toast.error({ detail: "ERROR", summary: "Something went wrong:(", duration: 5000 })
        }
      });
    } else {
      this.editMode = true;
    }
  }
}
