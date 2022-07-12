import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-leak',
  templateUrl: './leak.component.html',
  styleUrls: ['./leak.component.css']
})
export class LeakComponent implements OnInit, OnDestroy {
  public randomNumber: Array<object> = [];
  public lastExecutedTime = 0;
  public serviceCallCount = 0;

  constructor(
    private myService: DataService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.metaService.setMeta({});

    this.myService.getRandomNumber().subscribe((rand: number) => {
      const lastExecutedTime: number = Date.now();
      this.randomNumber.push({
        randomNumber: rand,
        serviceId: this.serviceCallCount,
        lastExecutedTime,
        executionGap: lastExecutedTime - this.lastExecutedTime
      });
      this.lastExecutedTime = lastExecutedTime;
      console.log(`[Leak] Received random number ${rand}`);
    });

    this.serviceCallCount = this.myService.getServiceCallCount();
  }

  ngOnDestroy() {
    console.log('[Leak] Component destroyed');
  }
}
