import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  currentMovie = null;
  message = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getMovie(this.route.snapshot.paramMap.get('id'));
  }

  getMovie(id: any): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateMovie(): void {
    this.movieService.update(this.currentMovie.id, this.currentMovie)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This movie was updated successfully!';
          setTimeout(() => this.router.navigate(['/movies']),3000);
        },
        error => {
          console.log(error);
        });
  }

  deleteMovie(): void {
    this.movieService.delete(this.currentMovie.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This movie was deleted successfully!';
          setTimeout(() => this.router.navigate(['/movies']),3000);
        },
        error => {
          console.log(error);
        });
  }
}
