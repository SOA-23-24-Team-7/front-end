import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment, UpdateComment } from '../model/comment.model';

@Component({
  selector: 'xp-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment: Comment;
  @Output() editComment = new EventEmitter<Comment>();
  @Output() deleteComment = new EventEmitter<Comment>(); 

  isEditMode = false;
  editedText: string;

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.editedText = this.comment.text;
    }
  }

  saveChanges(): void {
    this.comment.text = this.editedText;
    this.editComment.emit(this.comment);
    this.isEditMode = false;
  }

  onDeleteComment(): void {
    this.deleteComment.emit(this.comment);
  }
}