import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { PersonUpdate } from "./model/person-update.model";
import { ProblemComment } from "./model/problem-comment.model";
import { Person } from "./model/person.model";
import { ProblemUser } from "../marketplace/model/problem-with-user.model";
import { ProblemAnswer } from "./model/problem-answer.model";
import { ProblemUpdateDeadline } from "./model/problem-update-deadline.model";
import { ProblemCommentCreate } from "./model/problem-comment-create.model";
import { ProblemResolvingNotification } from "./model/problem-resolving-notification.model";

@Injectable({
    providedIn: "root",
})
export class StakeholderService {
    getProblemAnswer(
        problemId: number,
        userRole: string,
    ): Observable<ProblemAnswer> {
        return this.http.get<ProblemAnswer>(
            environment.apiHost +
                userRole +
                "/problem/" +
                problemId +
                "/problem-answer",
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

    createComment(
        problemComment: ProblemCommentCreate,
        problemId: number,
        userRole: string,
    ): Observable<ProblemComment> {
        return this.http.patch<ProblemComment>(
            environment.apiHost +
                userRole +
                "/problem/" +
                problemId +
                "/problem-comments",
            problemComment,
        );
    }

    createAnswer(
        problemAnswer: ProblemAnswer,
        problemId: number,
    ): Observable<ProblemAnswer> {
        console.log(problemId);
        return this.http.patch<ProblemAnswer>(
            environment.apiHost +
                "author/problem/" +
                problemId +
                "/problem-answer/",
            problemAnswer,
        );
    }

    resolveProblem(
        problemId: number,
        userRole: string,
    ): Observable<ProblemUser> {
        console.log(userRole);
        return this.http.get<ProblemUser>(
            environment.apiHost +
                userRole +
                "/problem/" +
                problemId +
                "/resolve",
        );
    }

    getProblemComments(
        problemId: number,
        userRole: string,
    ): Observable<PagedResults<ProblemComment>> {
        return this.http.get<PagedResults<ProblemComment>>(
            environment.apiHost +
                userRole +
                "/problem/" +
                problemId +
                "/problem-comments",
        );
    }

    getAdminsProblems(): Observable<PagedResults<ProblemUser>> {
        return this.http.get<PagedResults<ProblemUser>>(
            environment.apiHost + "administrator/problem",
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

    setDeadline(
        problem: ProblemUpdateDeadline,
    ): Observable<PagedResults<ProblemUser>> {
        console.log(problem);
        return this.http.put<PagedResults<ProblemUser>>(
            environment.apiHost +
                "administrator/problem/set-deadline/" +
                problem.id,
            problem,
        );
    }

    getNotificationsByLoggedInUser(): Observable<
        PagedResults<ProblemResolvingNotification>
    > {
        return this.http.get<PagedResults<ProblemResolvingNotification>>(
            environment.apiHost + "notifications/problems",
        );
    }

    setSeenStatus(
        notificationId: number,
    ): Observable<ProblemResolvingNotification> {
        return this.http.get<ProblemResolvingNotification>(
            environment.apiHost +
                "notifications/problems/set-seen/" +
                notificationId,
        );
    }
}
