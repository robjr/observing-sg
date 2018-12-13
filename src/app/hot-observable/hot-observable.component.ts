import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';
import { share } from 'rxjs/internal/operators';

@Component({
  selector: 'app-hot-observable',
  templateUrl: './hot-observable.component.html',
  styleUrls: ['./hot-observable.component.css']
})
export class HotObservableComponent implements OnInit {
  public messages: string[] = [];

  constructor() { }

  ngOnInit() {
    this.messages.push('Hot observable created');

    const coldObservable = Observable.create(
      observer => {
        this.messages.push('Executing subscriber body');

        setInterval(() => {
          observer.next(Math.floor(Math.random() * 1000) + ' - hot observable');
        }, 1000);

        setTimeout(() => {
          observer.complete();
        }, 5000);

      }
    );

    const hotObservable = coldObservable.pipe(share());

    this.messages.push('Calling subscribe method');
    hotObservable.subscribe(value => { this.messages.push('[1] ' + value) });
    hotObservable.subscribe(value => { this.messages.push('[2] ' + value) });
  }
}
