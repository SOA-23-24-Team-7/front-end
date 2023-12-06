import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../stakeholder/model/person.model';
import { Wallet } from '../../stakeholder/model/wallet.model';
import { AdministrationService } from '../administration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface ModalData {
  person: Person;
}
@Component({
  selector: 'xp-wallet-update-dialog',
  templateUrl: './wallet-update-dialog.component.html',
  styleUrls: ['./wallet-update-dialog.component.css']
})
export class WalletUpdateDialogComponent {
  person: Person;
  wallet: Wallet;

  adventureCoinForm = new FormGroup({
    adventureCoin: new FormControl('',[Validators.required]),
  });

  constructor(
    private service: AdministrationService,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}

  ngOnInit(): void {
    this.person = this.data.person;
    this.service.getTouristWallet(this.person.userId).subscribe({
        next: (result: Wallet) => {
            this.wallet = result;
        }
      });
    }
  submit(): void {
    if (parseInt(this.adventureCoinForm.value.adventureCoin || "-1") < 0){
      alert("Please input right number");
    }
    else{
      this.service.updateToursitWallet({id: this.wallet.id, adventureCoin: parseInt(this.adventureCoinForm.value.adventureCoin || "-1")}).subscribe({
        next: (result: Wallet) => {
          this.wallet = result;
        }
      });
    }
  }
}
