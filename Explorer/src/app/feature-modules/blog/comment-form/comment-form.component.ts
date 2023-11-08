import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../blog.service';
import { Comment, CreateComment } from '../model/comment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

export interface ModalData {
  blogId: number,
  user: User
}

@Component({
  selector: 'xp-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  commentText: string = "";
  @Output() commentsUpdated = new EventEmitter<null>();
  @Output() commentCreated = new EventEmitter<Comment>();

  constructor(private service: BlogService,
    public dialogRef: MatDialogRef<CommentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCommentClick(e: Event): void {
    const comment: CreateComment = {
      blogId: this.data.blogId,
      text: this.commentText
    }

    this.service.addComment(comment).subscribe({
      next: (result: Comment) => {
        this.dialogRef.close({
          comment: result
        })
        this.commentCreated.emit(result);
      }
    });
  }
}
