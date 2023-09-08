import { Component } from '@angular/core';
import { ChatService } from '../../../app/core/services/services/chat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  legalInformations: any[] = [];
  researchBooks: any[] = [];

  constructor(private chatService: ChatService) { }

  sendQuery(): void {
    this.chatService.sendMessage(this.query)
      .subscribe(data => {
        
          if (data.legalInformations) {
            this.legalInformations = data.legalInformations;        
          }

          if (data.researchBooks) {
            this.researchBooks = data.researchBooks;          
          }
      });
  }
}
