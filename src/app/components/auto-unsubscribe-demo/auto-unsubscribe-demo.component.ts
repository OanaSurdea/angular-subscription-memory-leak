import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';
import { AutoUnsubscribe } from '../../utils/auto-unsubscribe';

@Component({
  selector: 'app-auto-unsubscribe-demo',
  templateUrl: './auto-unsubscribe-demo.component.html',
  styleUrls: ['./auto-unsubscribe-demo.component.css']
})
export class AutoUnsubscribeDemoComponent implements OnInit, OnDestroy {
  public randomNumber: Array<object> = [];
  public lastExecutedTime = 0;
  public serviceCallCount = 0;

  @AutoUnsubscribe
  private allSubscriptions: Subscription;

  constructor(
    private myService: DataService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.metaService.setMeta({});
    this.allSubscriptions = this.myService
      .getRandomNumber()
      .subscribe((rand: number) => {
        const lastExecutedTime: number = Date.now();
        this.randomNumber.push({
          randomNumber: rand,
          serviceId: this.serviceCallCount,
          lastExecutedTime,
          executionGap: lastExecutedTime - this.lastExecutedTime
        });
        this.lastExecutedTime = lastExecutedTime;
        console.log(`[Auto Unsubscribe] Sub1 - Received random number ${rand}`);
      });

    this.allSubscriptions = this.myService
      .getRandomNumber()
      .subscribe((rand: number) => {
        const lastExecutedTime: number = Date.now();
        this.randomNumber.push({
          randomNumber: rand,
          serviceId: this.serviceCallCount,
          lastExecutedTime,
          executionGap: lastExecutedTime - this.lastExecutedTime
        });
        this.lastExecutedTime = lastExecutedTime;
        console.log(`[Auto Unsubscribe] Sub2 - Received random number ${rand}`);
      });
  }

  ngOnDestroy() {
    console.log('[Auto Unsubscribe] Component destroyed');
  }
}
