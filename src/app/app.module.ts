import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LeakComponent } from './components/leak/leak.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegularUnsubscribeComponent } from './components/regular-unsubscribe/regular-unsubscribe.component';
import { TakeUntilComponent } from './components/take-until/take-until.component';

@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent,

    NavbarComponent,

    HomeComponent,
    LeakComponent,
    RegularUnsubscribeComponent,
    TakeUntilComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
