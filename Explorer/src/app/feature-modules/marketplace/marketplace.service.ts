import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Club } from './model/club.model';
import { MyClubJoinRequest } from './model/my-club-join-request.model';
import { ClubJoinRequest } from './model/club-join-request.model copy';
import { ClubMember } from './model/club-member.model';
import { ClubInvitationUsername } from './model/club-invitation-username.model';
import { ClubInvitation } from './model/club-invitation.model';
import { ClubInvitationWithClubAndOwnerName } from './model/club-invitation-with-club-and-owner-name.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club')
  }
  getOwnerClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club/ownerclubs')
  }
  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'tourist/club', club);
  }
  updateEquipment(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'tourist/club/', club);
  }
  getMyClubJoinRequests(): Observable<PagedResults<MyClubJoinRequest>> {
    const route = `${environment.apiHost}tourist/club-join-request/tourist?page=1&pageSize=1000`
    return this.http.get<PagedResults<MyClubJoinRequest>>(route)
  }
  cancelClubJoinRequest(id: number): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request/${id}`
    return this.http.delete(route, { observe: 'response' })
  }
  respondClubJoinRequest(id: number, accepted: boolean): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request/${id}`
    return this.http.patch(route, { Accepted: accepted }, { observe: 'response' })
  }
  getClubJoinRequestsByClub(id: number): Observable<PagedResults<ClubJoinRequest>> {
    const route = `${environment.apiHost}tourist/club-join-request/club/${id}?page=1&pageSize=1000`
    return this.http.get<PagedResults<ClubJoinRequest>>(route)
  }
  sendClubJoinRequest(touristId: number, clubId: number): Observable<HttpResponse<any>> {
    const route = `${environment.apiHost}tourist/club-join-request`
    const body = { TouristId: touristId, ClubId: clubId }
    return this.http.post<PagedResults<ClubJoinRequest>>(route, body, { observe: 'response' })
  }
  getClubMembers(clubId: number): Observable<PagedResults<ClubMember>> {
    return this.http.get<PagedResults<ClubMember>>(environment.apiHost + `tourist/club/members/${clubId}`)
  }
  kickMember(id: number): Observable<ClubMember> {
    const route = environment.apiHost + "tourist/club/members/kick/" + id;
    return this.http.delete<ClubMember>(route);
  }
  inviteMember(invitation: ClubInvitationUsername): Observable<HttpResponse<any>> {
    const route = environment.apiHost + "tourist/club/invite/byUsername";
    const body: ClubInvitationUsername = { username: invitation.username, clubId: invitation.clubId };
    return this.http.post<PagedResults<ClubInvitationUsername>>(route, body, { observe: 'response' });
  }
  getInvitations(): Observable<PagedResults<ClubInvitationWithClubAndOwnerName>> {
    const route = environment.apiHost + "tourist/club/invite/my-invitations";
    return this.http.get<PagedResults<ClubInvitationWithClubAndOwnerName>>(route);
  }
  acceptInvite(invitationId: number): Observable<any> {
    const route = environment.apiHost + "tourist/club/invite/accept/" + invitationId;
    return this.http.patch<any>(route, { observe: 'response' });
  }
  rejectInvite(invitationId: number): Observable<any> {
    const route = environment.apiHost + "tourist/club/invite/reject/" + invitationId;
    return this.http.patch<any>(route, { observe: 'response' });
  }
}
