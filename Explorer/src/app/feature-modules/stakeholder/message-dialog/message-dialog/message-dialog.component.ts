import { Component, Input } from '@angular/core';
import { StakeholderService } from '../../stakeholder.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  @Input() IsOpen:boolean = false;
  message: string = '';
  senderId: number
  
  isDialogOpen: boolean = true;

  constructor(private stakeholderService: StakeholderService, private authService: AuthService) {}

ngOnInit()
{
  this.authService.checkIfUserExists();
}


  sendMessage() {
    if (this.message.trim() === '') {
      return;
    }

    const userId = this.authService.getCurrentUserId().id; // Dobijte ID trenutno ulogovanog korisnika


this.stakeholderService.sendMessage(this.message,userId,-11).subscribe(
  () => {        
    console.log('Poruka poslata');      
    this.isDialogOpen = false;
  },
  error => {        
    console.log('Nije nes dobro');
  }
)
}
}
