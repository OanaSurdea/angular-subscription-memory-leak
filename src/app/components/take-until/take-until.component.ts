import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.css']
})
export class TakeUntilComponent implements OnInit {
  public randomNumber: Array<object> = [];
  public lastExecutedTime = 0;
  public serviceCallCount = 0;
  public destroy$: Subject<boolean> = new Subject();

  constructor(
    private myService: DataService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.metaService.setMeta({});
    this.myService
      .getRandomNumber()
      .pipe(takeUntil(this.destroy$))
      .subscribe((rand: number) => {
        const lastExecutedTime: number = Date.now();
        this.randomNumber.push({
          randomNumber: rand,
          serviceId: this.serviceCallCount,
          lastExecutedTime,
          executionGap: lastExecutedTime - this.lastExecutedTime
        });
        this.lastExecutedTime = lastExecutedTime;
        console.log(`[Take Until] Received random number ${rand}`);
      });
    this.serviceCallCount = this.myService.getServiceCallCount();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    console.log('[Take Until] Component destroyed');
  }
}
