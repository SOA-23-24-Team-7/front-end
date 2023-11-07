import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { PersonUpdate } from "./model/person-update.model";
import { ProblemComment } from "./model/problem-comment.model";
import { Problem } from "../marketplace/model/problem.model";
import { Person } from "./model/person.model";
import { ProblemUser } from "../marketplace/model/problem-with-user.model";
import { ProblemCommentCreate } from "./model/problem-comment-create.model";
import { ProblemAnswer } from "./model/problem-answer";

@Injectable({
    providedIn: "root",
})
export class StakeholderService {
    getProblemAnswer(problemId: number): Observable<ProblemAnswer> {
        return this.http.get<ProblemAnswer>(
            environment.apiHost + "problem-answer/problem/" + problemId,
        );
    }
    constructor(private http: HttpClient) {}

    getPeople(): Observable<PagedResults<Person>> {
        return this.http.get<PagedResults<Person>>(
            environment.apiHost + "people",
        );
    }
    getByUserId(userId: number): Observable<Person> {
        return this.http.get<Person>(
            environment.apiHost + "people/person/" + userId,
        );
    }

    updatePerson(person: PersonUpdate): Observable<Person> {
        return this.http.put<Person>(
            environment.apiHost + "people/update/" + person.id,
            person,
        );
    }

    createProblemComment(
        problemComment: ProblemCommentCreate,
    ): Observable<ProblemComment> {
        return this.http.post<ProblemComment>(
            environment.apiHost + "problemComment/",
            problemComment,
        );
    }

    createAnswer(problemAnswer: ProblemAnswer): Observable<ProblemAnswer> {
        return this.http.post<ProblemAnswer>(
            environment.apiHost + "problemAnswer/",
            problemAnswer,
        );
    }

    getCommentsByProblemAnswerId(
        problemAnswerId: number,
    ): Observable<PagedResults<ProblemComment>> {
        return this.http.get<PagedResults<ProblemComment>>(
            environment.apiHost + "problemComment/" + problemAnswerId,
        );
    }

    resolveProblem(problemId: number): Observable<ProblemUser> {
        return this.http.get<ProblemUser>(
            environment.apiHost + "tourist/problem/resolve/" + problemId,
        );
    }

    getAdminsProblems(): Observable<PagedResults<ProblemUser>> {
        return this.http.get<PagedResults<ProblemUser>>(
            environment.apiHost + "administration/problem",
        );
    }

    getTouristsProblems(): Observable<PagedResults<ProblemUser>> {
        return this.http.get<PagedResults<ProblemUser>>(
            environment.apiHost + "tourist/problem",
        );
    }

    getAuthorsProblems(): Observable<PagedResults<ProblemUser>> {
        return this.http.get<PagedResults<ProblemUser>>(
            environment.apiHost + "author/problem",
        );
    }
}
