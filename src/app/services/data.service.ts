import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private randomNumber: Observable<number>;
  public randomValue: Observable<number>;
  public randomValue2: Observable<number>;
  private serviceCallCount = 0;

  constructor() { }

  public getRandomNumber() {
    this.serviceCallCount++;

    if (!this.randomNumber) {
      this.randomNumber = new Observable((subject: Observer<number>) => {
        setInterval(() => {
          const randomNumber =
            (Math.floor(Math.random() * 10) - 1) *
            (Math.floor(Math.random() * 30) + 1);
          subject.next(randomNumber);
        }, 1000);
      });
    }

    return this.randomNumber;
  }

  // getRandomValue() {
  //   if (!this.randomNumber) {
  //     this.randomValue = new Observable((subject: Observer<number>) => {
  //       setInterval(() => {
  //         const randomNumber =
  //           (Math.floor(Math.random() * 10) - 1) *
  //           (Math.floor(Math.random() * 30) + 1);
  //         const randomNumber2 =
  //           (Math.floor(Math.random() * 10) - 1) *
  //           (Math.floor(Math.random() * 30) + 1);
  //         subject.next(randomNumber2);
  //       }, 1000);
  //     });
  //   }

  //   return this.randomValue;
  // }

  getRandom() {
    return (
      (Math.floor(Math.random() * 10) - 1) *
      (Math.floor(Math.random() * 30) + 1)
    );
  }

  getRandomNumberPromise() {
    let number: number = 0;

    number =
      (Math.floor(Math.random() * 10) - 1) *
      (Math.floor(Math.random() * 30) + 1);

    return number;
  }

  getServiceCallCount() {
    return this.serviceCallCount;
  }

  getSquareValue(val: number): Observable<number> {
    const squareNumber = new Observable((subject: Observer<number>) => {
      setTimeout(() => {
        const squareNumber = val * val;
        subject.next(squareNumber);
      }, 500);
    });

    return squareNumber;
  }

  // getRandomValue2() {
  //   if (!this.randomNumber) {

  //     this.randomValue2 = new Observable((subject: Observer<any>) => {
  //       setInterval(() => {
  //         const randomNumber = { r1: this.getRandom(), r2: this.getRandom() };
  //         const randomNumber2 = { r1: this.getRandom(), r2: this.getRandom() };
  //         const randomNumber3 = { r1: this.getRandom(), r2: this.getRandom() };
  //         const randomNumber4 = { r1: this.getRandom(), r2: this.getRandom() };
  //         subject.next([randomNumber3, randomNumber4, randomNumber, randomNumber2]);
  //       }, 1000);
  //     });

  //   }

  //   return this.randomValue2;
  // }
}
