import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PagedResults } from "src/app/shared/model/paged-results.model";
import { Person } from "./model/person.model";
import { environment } from "src/env/environment";
import { Observable } from "rxjs";
import { Message, MessageUsernames } from "./model/message.model";
import { Follower } from "./model/follower.model";
import { Following } from "./model/following.model";
import { FollowerCreate } from "./model/follower-create.model";
import { UserFollow } from "./model/user-follow.model";

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
    getFollowers(id: number): Observable<PagedResults<Follower>> {
        return this.http.get<PagedResults<Follower>>(
            environment.apiHost + "follower/followers/" + id,
        );
    }
    getFollowings(id: number): Observable<PagedResults<Following>> {
        return this.http.get<PagedResults<Following>>(
            environment.apiHost + "follower/followings/" + id,
        );
    }
    getSearched(searchUsername: string): Observable<PagedResults<UserFollow>> {
        return this.http.get<PagedResults<UserFollow>>(
            environment.apiHost + "follower/search/" + searchUsername,
        );
    }
    deleteFollowing(id: number): Observable<Following> {
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
    ): Observable<PagedResults<MessageUsernames>> {
        return this.http.get<PagedResults<MessageUsernames>>(
            environment.apiHost + "messages/" + receiverId,
        );
    }

    updateMessageStatusOnSeen(updatedMessage: Message): Observable<Message> {
        return this.http.put<Message>(
            environment.apiHost + "messages/update-status",
            updatedMessage,
        );
    }
}
