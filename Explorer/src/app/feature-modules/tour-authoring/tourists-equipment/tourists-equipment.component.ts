import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../model/equipment.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-tourists-equipment',
  templateUrl: './tourists-equipment.component.html',
  styleUrls: ['./tourists-equipment.component.css']
})
export class TouristsEquipmentComponent {
  id:number
  route = inject(ActivatedRoute);
  equipment: Equipment[] =[]
  allEquipment: Equipment[] =[]
  //tour: Tour

  constructor(private service : TourAuthoringService) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.getTourEquiupment();

    this.getAllEquipment();
   
  }

  getTourEquiupment(): void{
    this.service.getTourEquipment(this.id).subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipment = result.results;
      },
      error: (err:any) =>{
        console.log(err);
      }
    })
  }

  getAllEquipment(): void{
    this.service.getAllEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.allEquipment = result.results;
      },
      error: (err:any) =>{
        console.log(err);
      }
    })
  }
  onAddClicked(eqId: number): void {
      this.service.addTourEquipment(this.id,eqId).subscribe({
        next: ( ) =>{
          this.getTourEquiupment();
        }
      })
  }

  checkIfAlreadyExists(eqId:number): boolean{
    return this.equipment.filter(eqp=> eqp.id === eqId).length > 0;
  }
  
  onRemoveClicked(eqId:number): void {
    this.service.deleteTourEquipment(this.id,eqId).subscribe({
      next: ( ) =>{
        this.getTourEquiupment();
      }
    })
  }
}
