import { Component, OnInit, signal, Signal } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.html',
  styleUrls: ['./poll.css']
})
export class PollComponent implements OnInit {
  polls = signal<Poll[]>([]);
  
  newPoll: Poll = {
    id: null,
    question: '',
    options: [
      { voteOption: '', voteCount: 0 },
      { voteOption: '', voteCount: 0 },
    ],
  };
    
  private subs = new Subscription();

  constructor(private pollService: PollService) {}

  ngOnInit() {
       const sig = this.pollService.getPolls().subscribe({
      next: (data: Poll[]) => {
        this.polls.set(data ?? []);
      },
      error: (error: Error) => {
        console.error('Failed to load polls', error);
      }
    });
    this.subs.add(sig);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

 
  createPoll() {
    const { id, ...payload } = this.newPoll as Poll;
    const s = this.pollService.createPoll(payload).subscribe({
      next: (created: Poll) => {
        this.polls.update(arr => [...arr, created]);
        this.newPoll = {
          id: null,
          question: '',
          options: [
            { voteOption: '', voteCount: 0 },
            { voteOption: '', voteCount: 0 },
          ]
        };
      },
      error: (err) => console.error('Error creating poll', err)
    });
    this.subs.add(s);
  }

  resetPoll() {
    this.newPoll = {
      id: null,
    question: '',
    options: [
      { voteOption: '', voteCount: 0 },
      { voteOption: '', voteCount: 0 }
    ]
    };
  }

  isCreateDisabled(): boolean {
    const q = (this.newPoll?.question ?? '').trim();
    const options = this.newPoll?.options ?? [];
    const validOptions = options.filter(o => (o?.voteOption ?? '').trim().length > 0);
    return q.length === 0 || validOptions.length < 2;
  }

  addOption() {
    const maxOption = 5;
    if (this.newPoll.options.length >= maxOption) {
      window.alert(`Max of ${maxOption} options reached`);
      return;
    }
    this.newPoll.options.push({ voteOption: '', voteCount: 0 });
  }

  vote(pollId: number, optionIndex: number) {
    const s = this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        this.polls.update(list => list.map(p => {
          if (p.id !== pollId) return p;
          const updatedOptions = p.options.map((opt, idx) =>
            idx === optionIndex ? { ...opt, voteCount: opt.voteCount + 1 } : opt
          );
          return { ...p, options: updatedOptions };
        }));
      },
      error: (err) => {
        console.error('Vote failed', err);
      }
    });
    this.subs.add(s);
  }

  trackByIndex(index: number): Number {
    return index;
  }
}