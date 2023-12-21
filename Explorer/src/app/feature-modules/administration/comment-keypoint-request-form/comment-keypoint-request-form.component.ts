import { Component, Inject } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xp-comment-keypoint-request-form',
  templateUrl: './comment-keypoint-request-form.component.html',
  styleUrls: ['./comment-keypoint-request-form.component.css']
})
export class CommentKeyPointRequestFormComponent {
  constructor(
    private service: AdministrationService,
    public dialog: MatDialogRef<CommentKeyPointRequestFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  faXmark = faXmark;
  commentKeyPointRequestForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  submit():void{
    const updatedData = this.commentKeyPointRequestForm.value;
    if(this.data.id!=undefined && updatedData.comment!=null){
      this.service.rejectPublicKeyPointRequest(this.data.id,updatedData.comment).subscribe()
        this.dialog.close(this.data);
        location.reload()
    } 
  }
  onClose(): void {
    this.dialog.close();
}
}
