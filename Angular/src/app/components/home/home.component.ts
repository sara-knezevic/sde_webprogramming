import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any;
  shows: any;

  constructor(
    private movieService: MovieService,
    private showService: ShowService
  ) { }

  ngOnInit(): void {
    this.retrieveMovies();
    this.retrieveShows();
  }

  retrieveMovies(): void {
    this.movieService.getAll()
      .subscribe(
        data => {
          this.movies = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveShows(): void {
    this.showService.getAll()
      .subscribe(
        data => {
          this.shows = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
