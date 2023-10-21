import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { KeyPoint } from '../model/key-point.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/env/environment';

@Component({
  selector: 'xp-key-point-form',
  templateUrl: './key-point-form.component.html',
  styleUrls: ['./key-point-form.component.css']
})
export class KeyPointFormComponent implements OnChanges {

  @Output() keyPointUpdated = new EventEmitter<null>();
  @Input() keyPoint: KeyPoint;
  @Input() shouldEdit: boolean = false;
  tourImage: string | null = null;
  tourImageFile: File | null = null;

  constructor(private route: ActivatedRoute, private service: TourAuthoringService) { }

  ngOnChanges(): void {
    this.tourImage = null;
    this.tourImageFile = null;
    this.keyPointForm.reset();
    if(this.shouldEdit) {
      this.tourImage = environment.imageHost + this.keyPoint.imagePath;
      this.keyPointForm.patchValue(this.keyPoint);
    }
  }

  keyPointForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    longitude: new FormControl<number>(0, [Validators.required]),
    latitude: new FormControl<number>(0, [Validators.required])
  });

  onSelectImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files && element.files[0]) {
      this.tourImageFile = element.files[0];

      const reader = new FileReader();
    
      reader.readAsDataURL(this.tourImageFile);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.tourImage = reader.result as string
      };
    }
  }

  addKeyPoint(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        this.service.uploadImage(this.tourImageFile!).subscribe({
          next: (imagePath: string) => {
            const keyPoint: KeyPoint = {
              tourId: +params.get('id')!,
              name: this.keyPointForm.value.name || "",
              description: this.keyPointForm.value.description || "",
              longitude: this.keyPointForm.value.longitude || 0,
              latitude: this.keyPointForm.value.latitude || 0,
              imagePath: imagePath
            };
            this.service.addKeyPoint(keyPoint).subscribe({
              next: () => { this.keyPointUpdated.emit() }
            });
          }
        });
      }
    });
  }

  updateKeyPoint(): void {
    const keyPoint: KeyPoint = {
      id: this.keyPoint.id,
      tourId: 1,
      name: this.keyPointForm.value.name || "",
      description: this.keyPointForm.value.description || "",
      longitude: this.keyPointForm.value.longitude || 0,
      latitude: this.keyPointForm.value.latitude || 0,
      imagePath: ""
    };
    this.service.updateKeyPoint(keyPoint).subscribe({
      next: () => { this.keyPointUpdated.emit();}
    });
  }
}
