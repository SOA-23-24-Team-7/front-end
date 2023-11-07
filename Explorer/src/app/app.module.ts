import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { AdministrationModule } from './feature-modules/administration/administration.module';
import { MarketplaceModule } from './feature-modules/marketplace/marketplace.module';
import { TourAuthoringModule } from './feature-modules/tour-authoring/tour-authoring.module';
import { TourExecutionModule } from './feature-modules/tour-execution/tour-execution.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { CreateBlogComponent } from './feature-modules/blog/create-blog/create-blog.component';
import { BlogModule } from './feature-modules/blog/blog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StakeholderModule } from './feature-modules/stakeholder/stakeholder.module';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { MessageDialogComponent } from './feature-modules/stakeholder/message-dialog/message-dialog/message-dialog.component';
import { UserProfileComponent } from './feature-modules/stakeholder/user-profile/user-profile.component';




@NgModule({
  declarations: [AppComponent,CreateBlogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdministrationModule,
    BlogModule,
    MarketplaceModule,
    TourAuthoringModule,
    TourExecutionModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    StakeholderModule,
    NgxGoogleAnalyticsModule.forRoot('G-YF6NHGD2NQ'),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

