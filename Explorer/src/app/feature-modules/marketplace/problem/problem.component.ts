import { Component, OnInit } from '@angular/core';
import { Problem } from '../model/problem.model';
import { MarketplaceService } from '../marketplace.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit{
  problem: Problem[]=[]
  selectedProblem: Problem;
  shouldEdit: boolean;
  shouldRenderProblemForm: boolean = false;
  touristId: number;
  user: User;
  constructor(private service: MarketplaceService,private authService: AuthService){}
  ngOnInit(): void {
    this.getProblem();
    this.authService.user$.subscribe(user=>{
      this.user=user;
    })
  }
  getProblem(): void {
    this.service.getProblem().subscribe({
      next: (result: PagedResults<Problem>) => {
        this.problem=result.results
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  onEditClicked(problem:Problem) : void {
    this.selectedProblem=problem;
    this.shouldRenderProblemForm=true;
    this.shouldEdit=true;
  }
  deleteProblem(id: number): void {
    this.service.deleteProblem(id).subscribe({
      next: () => {
        this.getProblem();
      },
    })
  }
  onAddClicked(): void {
    this.shouldEdit = false;
    this.shouldRenderProblemForm = true;
  }
}
