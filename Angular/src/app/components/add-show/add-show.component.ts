import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css']
})
export class AddShowComponent implements OnInit {
  show = {
    title: '',
    genre: '',
    seasons: '',
    active: false
  };
  submitted = false;

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  saveShow(): void {
    const data = {
      title: this.show.title,
      genre: this.show.genre,
      seasons: this.show.seasons,
      active: this.show.active
    };

    this.showService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newShow(): void {
    this.submitted = false;
    this.show = {
      title: '',
      genre: '',
      seasons: '',
      active: false
    };
  }
}
