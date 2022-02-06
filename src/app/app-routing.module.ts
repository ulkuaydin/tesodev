import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './_views/landing-page.component';
import { SearchResultsComponent } from './_views/search-results/search-results.component';

const routes: Routes = [{
  path:"",component:LandingPageComponent
},
{
  path:"searchResults",component:LandingPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
