import { Component, OnInit } from '@angular/core';
import { Problem } from '../../marketplace/model/problem.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'xp-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.css']
})
export class ProblemViewComponent implements OnInit{
  problems: Problem[]=[]
  constructor(private service: AdministrationService){}
  ngOnInit(): void {
    this.getProblem();   
  }
  getProblem(): void {
    this.service.getProblem().subscribe({
      next: (result: PagedResults<Problem>) => {
        this.problems=result.results
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}
