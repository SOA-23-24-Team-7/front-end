import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Person } from "./model/person.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { Message } from "./model/message";
import { Follower } from "./model/follower.model";
import { Following } from "./model/following.model";
import { FollowerCreate } from "./model/followerCreate.model";

@Injectable({
    providedIn: "root",
})
export class StakeholderService {
    constructor(private http: HttpClient) {}

    getPeople(): Observable<PagedResults<Person>> {
        return this.http.get<PagedResults<Person>>(
            environment.apiHost + "people",
        );
    }
    getFollowers(): Observable<PagedResults<Follower>> {
        return this.http.get<PagedResults<Follower>>(
            environment.apiHost + "follower/followers",
        );
    }
    getFollowings(): Observable<PagedResults<Following>> {
        return this.http.get<PagedResults<Following>>(
            environment.apiHost + "follower/followings",
        );
    }
    deleteFollowing(id: number): Observable<Following> {
        console.log("sdssddsdsds");
        return this.http.delete<Following>(
            environment.apiHost + "follower/" + id,
        );
    }
    addFollowing(follow: FollowerCreate): Observable<FollowerCreate> {
        return this.http.post<FollowerCreate>(
            environment.apiHost + "follower",
            follow,
        );
    }
    getByUserId(userId: number): Observable<Person> {
        return this.http.get<Person>(
            environment.apiHost + "people/person/" + userId,
        );
    }

    updatePerson(person: Person): Observable<Person> {
        return this.http.put<Person>(
            environment.apiHost + "people/update/",
            person,
        );
    }

    sendMessage(
        message: string,
        senderMessageID: number,
        reciverMessageID: number,
    ) {
        return this.http.post(environment.apiHost + "messages/create", {
            Text: message,
            UserSenderId: senderMessageID,
            UserReciverId: reciverMessageID,
        });
    }

    getMessages(
        page: number,
        pageSize: number,
        receiverId: number,
    ): Observable<PagedResults<Message>> {
        return this.http.get<PagedResults<Message>>(
            environment.apiHost + "messages/" + receiverId,
        );
    }
}
