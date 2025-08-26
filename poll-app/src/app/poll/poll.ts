import { Component, OnInit, signal } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class PollComponent implements OnInit {
  polls: Poll[] = [];

  constructor(private pollService: PollService) {

  }
  ngOnInit(): void {
      this.loadPolls();
  }

  loadPolls() {
    this.pollService.getPolls().subscribe({
      next: (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error("Error fetching polls data:", error);
      }
    })
  }
}
