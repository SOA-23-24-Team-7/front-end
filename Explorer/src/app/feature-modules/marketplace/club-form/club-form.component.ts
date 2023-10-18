import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { Club } from '../model/club.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnChanges {

  @Output() clubUpdated = new EventEmitter<null>();
  @Input() club: Club;
  @Input() shouldEdit: boolean = false;

  constructor(private service: MarketplaceService) {
  }

  ngOnChanges(): void {
    this.clubForm.reset();
    if(this.shouldEdit) {
      this.clubForm.patchValue(this.club);
    }
  }

  clubForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  addClub(): void {
    const club: Club = {
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      image: this.clubForm.value.image || "",
      ownerId: 0 //na bekendu ce se dodeliti pravi id ulogovanog korisnika
    };
    this.service.addClub(club).subscribe({
      next: () => { this.clubUpdated.emit() }
    });
  }
  updateClub(): void {
    const club: Club = {
      ownerId: this.club.ownerId,
      name: this.clubForm.value.name || "",
      description: this.clubForm.value.description || "",
      image: this.clubForm.value.image || ""
    };
    club.id = this.club.id;
    this.service.updateEquipment(club).subscribe({
      next: () => { this.clubUpdated.emit();}
    });
  }
}
