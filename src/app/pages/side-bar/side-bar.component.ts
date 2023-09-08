import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResearchBookService } from 'src/app/core/services/research-book.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  researchBooks: any = {}; // Assuming researchBooks is initially an object
  researchBooksArray: any[] = []; 
  loggedInUserId: string = '';
  userName:string = "";
  initials: string = '';
  constructor(private researchBookService: ResearchBookService,
    private userService: UserService, private router:Router) {}

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

signOut() {
  debugger
  this.userService.removeToken();
  this.userService.logout();
  this.router.navigate(["/"]);
}
}
