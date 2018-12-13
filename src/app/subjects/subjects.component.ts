import { Component, OnInit } from '@angular/core';
import {AsyncSubject, BehaviorSubject, interval, ReplaySubject, Subject, Subscription} from "rxjs";
import {delay, last, map, take} from "rxjs/operators";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  public subject: Subject<string> = new Subject<string>();
  public behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Initial value');
  public replaySubject: ReplaySubject<string> = new ReplaySubject<string>();
  public asyncSubject: AsyncSubject<string> = new AsyncSubject<string>();

  public subjectMessages: string[] = [];
  public behaviorSubjectMessages: string[] = [];
  public replaySubjectMessages: string[] = [];
  public asyncSubjectMessages: string[] = [];

  constructor() { }

  ngOnInit() {


  }

  public startSubject(): void {
    let subscription: Subscription = this.subject.subscribe((value) => {
      this.subjectMessages.push('Receiving Value ' + value);
    });

    let producer = setInterval(() => {
      const randomValue = Math.floor(Math.random()*100) + 'cm';
      this.subjectMessages.push('Sending Value ' + randomValue);
      this.subject.next(randomValue);
    }, 2000);

    setTimeout(() => {
      subscription.unsubscribe();
      }, 8000
    );

    setTimeout(() => {
      subscription = this.subject.subscribe((value) => {
        this.subjectMessages.push('Receiving Value ' + value);
      });

      const secondSubscription: Subscription = this.subject.subscribe((value) => {
        this.subjectMessages.push('Second Subscription Receiving Value ' + value);
      });

      subscription.add(secondSubscription);
      }, 15000
    );

    setTimeout(() => {
        this.subjectMessages.push('Subject completed! Nothing should receive values despite the attempts to send it');
        this.subject.complete();
      },
      25000
    );

    setTimeout(() => {
      this.subjectMessages.push('Clearing subscriptions and time interval');
      subscription.unsubscribe();
      clearInterval(producer);
      }, 35000
    );
  }

  public startBehaviorSubject(): void {
    this.behaviorSubject.subscribe(value => {
      this.behaviorSubjectMessages.push('First subscriber: ' + value);
    });


    this.behaviorSubject.next('Second Value');
    this.behaviorSubject.next('Third Value');

    this.behaviorSubject.subscribe(value => {
      this.behaviorSubjectMessages.push('Second subscriber: ' + value);
    });

    this.behaviorSubject.next('New Value that should be in both subscribers');
  }

  public startReplaySubject(): void {
    this.replaySubject.next('First value');
    this.replaySubject.next('Second value');
    this.replaySubject.next('Third value');

    this.replaySubject.subscribe(value => {
      this.replaySubjectMessages.push('First subscriber: ' + value);
    });

    this.replaySubject.next('Four value');
    this.replaySubject.next('Fifth value');

    this.replaySubject.subscribe(value => {
      this.replaySubjectMessages.push('Second subscriber: ' + value);
    });

    this.replaySubject.next('Last value');
  }

  public startAsyncSubject(): void {
    this.asyncSubject.subscribe(value => {
      this.asyncSubjectMessages.push('Finally got ' + value);
    });

    const intervalObservable = interval(1000).pipe(
      take(5),
      map(value => {
        this.asyncSubjectMessages.push('Sending value: ' + value);
        this.asyncSubject.next('value: ' + value);
      })
    );

    const lastValueOfIntervalObservable = intervalObservable.pipe(last());
    lastValueOfIntervalObservable.subscribe(value => {
      this.asyncSubjectMessages.push('Completing AsyncSubject');
      this.asyncSubject.complete();
    });
  }
}
