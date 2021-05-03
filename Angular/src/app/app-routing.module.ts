import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { HomeComponent } from './components/home/home.component';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { AddShowComponent } from './components/add-show/add-show.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'add_movie', component: AddMovieComponent },
  { path: 'shows', component: ShowListComponent },
  { path: 'shows/:id', component: ShowDetailsComponent },
  { path: 'add_show', component: AddShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
