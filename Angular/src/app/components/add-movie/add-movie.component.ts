import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movie = {
    title: '',
    genre: '',
    year: ''
  };
  submitted = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  saveMovie(): void {
    const data = {
      title: this.movie.title,
      genre: this.movie.genre,
      year: this.movie.year
    };

    this.movieService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newMovie(): void {
    this.submitted = false;
    this.movie = {
      title: '',
      genre: '',
      year: ''
    };
  }

}
