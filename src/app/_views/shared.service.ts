import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private data = new BehaviorSubject<string[]>([]);
  private click = new BehaviorSubject<boolean>(false);
  private filterString1 = new BehaviorSubject<string>('');
  currentData = this.data.asObservable();
  buttonClick = this.click.asObservable();
  currentFilterString1 = this.filterString1.asObservable();
  constructor() {}

  sharedFilterString1(filter: string) {
    this.filterString1.next(filter);
  }
  sharedButtonClick(click: boolean) {
    this.click.next(click);
  }
}
