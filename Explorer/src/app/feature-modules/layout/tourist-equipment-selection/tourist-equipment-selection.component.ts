import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../administration/model/equipment.model';
import { TouristEquipment } from '../model/touristequipment.model';
import { LayoutService } from '../layout.services';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-tourist-equipment-selection',
  templateUrl: './tourist-equipment-selection.component.html',
  styleUrls: ['./tourist-equipment-selection.component.css']
})
export class TouristEquipmentSelectionComponent implements OnInit {

  allEquipment : Equipment[] = [];
  touristEquipment : TouristEquipment;
  touristEquipmentFound : boolean = false;
  user: User | undefined;

  constructor(private service: LayoutService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getEquipment();
    this.getTouristEquipment();

    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  getEquipment(): void {
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.allEquipment = result.results;
      },
      error: () => {
      }
    })
  }

  getTouristEquipment(): void {
    this.service.getTouristEquipment().subscribe({
      next: (result: PagedResults<TouristEquipment>) => {
        let allTouristEquipments = result.results;
        for(let tourequ of allTouristEquipments){
          if(tourequ.touristId == this.user?.id){
            this.touristEquipment = tourequ
            this.touristEquipmentFound = true
          }
        }
        if(!this.touristEquipmentFound){
          this.touristEquipment = {
            id: -1,
            touristId: this.user !== undefined ? this.user.id : -1,
            equipmentIds: []
          }
        }
      },
      error: () => {
      }
    })
  }
  
  removeEquipmentFromTourist(equipmentId: number): void {
    this.touristEquipment.equipmentIds.splice(this.touristEquipment?.equipmentIds.indexOf(equipmentId), 1)
  }
  
  addEquipmentToTourist(equipmentId: number): void {
    this.touristEquipment.equipmentIds.push(equipmentId)
  }

  save(): void {
    if(this.touristEquipmentFound){
      if(this.touristEquipment.equipmentIds.length == 0){
        this.service.deleteTouristEquipment(this.touristEquipment.id).subscribe({
          next: () => {
            this.touristEquipmentFound = false;
          },
          error: () => {
          }
        });
        
        return;
      }

      this.service.saveTouristEquipment(this.touristEquipment).subscribe({
        next: (result: TouristEquipment) => {
          this.touristEquipment = result;
        },
        error: () => {
        }
      });
    } else{
      if(this.touristEquipment.equipmentIds.length == 0){
        return;
      }
      this.touristEquipmentFound = true;
      this.service.createTouristEquipment(this.touristEquipment).subscribe({
        next: (result: TouristEquipment) => {
          this.touristEquipment = result;
        },
        error: () => {
        }
      });
    }
  }
}
