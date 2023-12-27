import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from "src/env/environment";

@Component({
  selector: 'xp-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  gameFile = this.sanitizer.bypassSecurityTrustResourceUrl(environment.host + 'game.html');

  constructor(private sanitizer: DomSanitizer) {}
}
