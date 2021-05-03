import { Component, OnInit } from '@angular/core';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  shows: any;
  currentShow = null;
  currentIndex = -1;
  title = '';

  constructor(private showService: ShowService) { }

  ngOnInit(): void {
    this.retrieveShows();
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

  refreshList(): void {
    this.retrieveShows();
    this.currentShow = null;
    this.currentIndex = -1;
  }

  setActiveShow(show: any, index: any): void {
    if (this.currentShow == show) {
      this.currentShow = null;
      this.currentIndex = -1;
    } else {
      this.currentShow = show;
      this.currentIndex = index;
    }
  }

  removeAllShows(): void {
    this.currentShow = null;
    this.currentIndex = -1;

    this.showService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveShows();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.currentShow = null;
    this.currentIndex = -1;

    this.showService.findByTitle(this.title)
      .subscribe(
        data => {
          console.log(this.title);
          this.shows = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
