import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-regular-unsubscribe',
  templateUrl: './regular-unsubscribe.component.html',
  styleUrls: ['./regular-unsubscribe.component.css']
})
export class RegularUnsubscribeComponent implements OnInit, OnDestroy {
  public randomNumber: Array<object> = [];
  public lastExecutedTime = 0;
  public serviceCallCount = 0;
  public allSubscriptions: Subscription[] = [];

  constructor(
    private myService: DataService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.metaService.setMeta({});
    const sub = this.myService.getRandomNumber().subscribe((rand: number) => {
      const lastExecutedTime: number = Date.now();
      this.randomNumber.push({
        randomNumber: rand,
        serviceId: this.serviceCallCount,
        lastExecutedTime,
        executionGap: lastExecutedTime - this.lastExecutedTime
      });
      this.lastExecutedTime = lastExecutedTime;
      console.log(`[Regular unsubscribe] Received random number ${rand}`);
    });
    this.serviceCallCount = this.myService.getServiceCallCount();

    this.allSubscriptions.push(sub);
  }

  ngOnDestroy() {
    this.allSubscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    console.log('[Regular unsubscribe] Component destroyed');
  }
}
