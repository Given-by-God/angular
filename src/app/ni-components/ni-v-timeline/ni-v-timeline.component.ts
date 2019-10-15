import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ni-v-timeline',
  templateUrl: './ni-v-timeline.component.html',
  styleUrls: ['./ni-v-timeline.component.scss'],
  host: {
    '[class.ni-v-timeline]': 'true',
    '[class.show-years]': 'showYears',
    '[class.show-date]': 'showDate'
  }
})
export class NiVTimelineComponent implements OnInit {
  @Input() showYears: boolean = false;
  @Input() showDate: boolean = true;
  @Input() align: string = 'left';
  @Input() style: any = '';
  @Input() data: any[] = [];

  @HostBinding('class.align-left') alignLeft: boolean = false;
  @HostBinding('class.align-center') alignCenter: boolean = false;
  @HostBinding('class.align-right') alignRight: boolean = false;
  @HostBinding('class.align-between') alignBetween: boolean = false;

  constructor() { }

  ngOnInit() {
    this.alignLeft = (this.align === 'left');
    this.alignCenter = (this.align === 'center');
    this.alignRight = (this.align === 'right');
    this.alignBetween = (this.align === 'between');
  }
}
