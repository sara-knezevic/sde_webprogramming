import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {
  currentShow = null;
  message = '';

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getShow(this.route.snapshot.paramMap.get('id'));
  }

  getShow(id: any): void {
    this.showService.get(id)
      .subscribe(
        data => {
          this.currentShow = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateShow(): void {
    this.showService.update(this.currentShow.id, this.currentShow)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This show was updated successfully!';
          setTimeout(() => this.router.navigate(['/shows']),3000);
        },
        error => {
          console.log(error);
        });
  }

  deleteShow(): void {
    this.showService.delete(this.currentShow.id)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'This show was deleted successfully!';
          setTimeout(() => this.router.navigate(['/shows']),3000);
        },
        error => {
          console.log(error);
        });
  }
}
