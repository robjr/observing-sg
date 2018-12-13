import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-cold-observable',
  templateUrl: './cold-observable.component.html',
  styleUrls: ['./cold-observable.component.css']
})
export class ColdObservableComponent implements OnInit {
  public messages: string[] = [];

  constructor() { }

  ngOnInit() {
    this.messages.push('Cold observable created');
    const coldObservable = new Observable(
      observer => {
        this.messages.push('Executing subscriber body');

        setInterval(() => {
          observer.next(Math.floor(Math.random() * 1000) + ' - cold observable');
        }, 1000);

        setTimeout(() => {
          observer.complete();
        }, 5000);
      }
    );

    this.messages.push('Calling subscribe method');
    coldObservable.subscribe(value => { this.messages.push('[1] ' + value ) });
    coldObservable.subscribe(value => { this.messages.push('[2] ' + value ) });
  }

}
