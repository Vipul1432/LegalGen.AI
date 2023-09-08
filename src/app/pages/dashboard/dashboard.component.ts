import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchBookService } from 'src/app/core/services/research-book.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  researchBooks: any = {}; // Assuming researchBooks is initially an object
  researchBooksArray: any[] = []; // Array to store the values of researchBooks
  query: string = '';
  isPopupOpen: boolean = false;
  loggedInUserId: string = '';
  userName:string = "";
  initials: string = '';

  constructor(private researchBookService: ResearchBookService,
     private userService: UserService,
     private router: Router) {}

  ngOnInit(): void {
    this.loadResearchBooks();
    this.userService.getLoggedInUserId().subscribe(
      (data) => {
        this.loggedInUserId = data;
      },
      (error) => {
        console.error('Error in getUserID subscription:', error);
      }
    );
    this.userService.getUserName().subscribe(
    (name) => {
      this.userName = name;
      this.initials = this.userService.generateUserInitials(name);
    },
    (error) => {
      console.error('Error fetching user name:', error);
    }
  );
  }

  loadResearchBooks() {
    this.researchBookService.getResearchBooks().subscribe((data) => {
      this.researchBooks = data;
      this.researchBooksArray = Object.values(data);
      console.log(this.researchBooksArray); // Convert object values to an array
    });
  }
  
  addQuerytoResearchBook() {
    const data = {
      name: this.query,
      dateCreated: new Date(),
      lastModified: new Date(),
      userId: this.loggedInUserId
    }
    console.log(data);
   this.researchBookService.createResearchBook(data).subscribe((res)=>
   {
    console.log(res);
    // Update the researchBooksArray with the new query
    this.researchBooksArray.push(data);
    this.query = ''; // Clear the input field
    this.closePopup(); // Close the modal);
   });
  }


  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }


  signOut() {
    debugger
    this.userService.removeToken();
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
