import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, delay, filter, flatMap, map, scan, switchMap, throttleTime} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {combineLatest, concat, forkJoin, fromEvent, interval, merge, of, pipe, race} from "rxjs";

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  public searchTerm: FormControl = new FormControl();
  public numberOfRepos: number = -1;

  public subjectMessages: string[] = [];
  public forkJoinMessages: string[] = [];
  public mergeMessages: string[] = [];
  public concatMessages: string[] = [];
  public raceMessages: string[] = [];
  public multiplicationResult: number = -1;

  constructor() { }

  ngOnInit() {
    const observable = this.searchTerm.valueChanges.pipe(
      // throttleTime(500),
      switchMap((term, index) => { //try to change to flatMap and observe that the request are not cancelled
        return ajax.getJSON('https://api.github.com/search/repositories?q=' + term);
      })
    );

    observable.subscribe((value: any) => {
      this.numberOfRepos = value.total_count;
    })

    const fiveTimesButton = fromEvent(document.getElementById('fiveTimesButton'), 'click').pipe(
      map(() => { return 1}),
      scan((acc, value) => {
        return acc + 1;
      }),
      filter(value => { return value >= 5})
    );
    const anyTimeButton = fromEvent(document.getElementById('anyTimeButton'), 'click');

    combineLatest(
      fiveTimesButton,
      anyTimeButton
    ).subscribe(
      ([value, event]) => {
        this.multiplicationResult = value;
      }
    );
 }

  public startForkJoin(): void {
    const googleObservable = of('Google').pipe(delay(1000));
    const yahooObservable = of('Yahoo').pipe(delay(2000));
    const duckduckGoObservable = of('MSN').pipe(delay(3000));

    const responses =  forkJoin(
      googleObservable,
      yahooObservable,
      duckduckGoObservable
    );

    responses.subscribe(website => {
        this.forkJoinMessages.push('Got response from: ' + website);
      }
    );
  }

  public startRace(): void {
    const googleObservable = of('Google').pipe(delay(1000));
    const yahooObservable = of('Yahoo').pipe(delay(2000));
    const duckduckGoObservable = of('MSN').pipe(delay(3000));

    const responses =  race(
      googleObservable,
      yahooObservable,
      duckduckGoObservable
    );

    responses.subscribe(website => {
        this.raceMessages.push('Got response from: ' + website);
      }
    );
  }

  public startMerge(): void {
    const googleObservable = of('Google').pipe(delay(4000));
    const yahooObservable = of('Yahoo').pipe(delay(5000));
    const duckduckGoObservable = of('MSN').pipe(delay(6000));

    const responses =  merge(
      googleObservable,
      yahooObservable,
      duckduckGoObservable
    );

    responses.subscribe(website => {
        this.mergeMessages.push('Got response from: ' + website);
      }
    );
  }

  public startConcat(): void {
    const googleObservable = of('Google').pipe(delay(7000));
    const yahooObservable = of('Yahoo').pipe(delay(8000));
    const duckduckGoObservable = of('MSN').pipe(delay(9000));

    const responses =  concat(
      googleObservable,
      yahooObservable,
      duckduckGoObservable
    );

    responses.subscribe(website => {
        this.concatMessages.push('Got response from: ' + website);
      }
    );
  }

  public startAll(): void {
    this.startForkJoin();
    this.startRace();
    this.startMerge();
    this.startConcat();
  }
}
