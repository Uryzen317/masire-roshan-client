import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-game-section',
  templateUrl: './post-section.component.html'
})
export class PostSectionComponent implements OnInit {
  constructor() {}
  @Input() thread: any;

  sortedStyles!: string[];
  selectionBase = [0, 1, 2, 3, 4];
  styles!: string[];
  shallNavigate = true; //disables the navigation of side images for small screens sizes
  environment: any = environment;
  active: any = 2;

  ngOnInit(): void {
    this.shallNavigate = window.innerWidth > 640 ? true : false;
    this.sortedStyles = [
      `-left-20 sm:-left-36 scale-75 z-0 blur-sm cursor-default shadow-${this.thread.primaryColor}`,
      `-left-10 sm:-left-16 scale-90 z-10 blur-[1px] cursor-default shadow-${this.thread.primaryColor}`,
      `left-0 sm:left-0 scale-100 z-20 blur-none cursor-pointer shadow-${this.thread.primaryColor}`,
      `-right-10 sm:-right-16 scale-90 z-10 blur-[1px] cursor-default shadow-${this.thread.primaryColor}`,
      `-right-20 sm:-right-36 scale-75 z-0 blur-sm cursor-default shadow-${this.thread.primaryColor}`
    ];
    this.styles = [
      this.sortedStyles[0],
      this.sortedStyles[1],
      this.sortedStyles[2],
      this.sortedStyles[3],
      this.sortedStyles[4]
    ];
  }

  // next() {
  //   for (let counter in this.styles) {
  //     this.selectionBase[counter] = this.increment(
  //       this.selectionBase[counter],
  //       4,
  //       0
  //     );
  //     this.styles[counter] = this.sortedStyles[this.selectionBase[counter]];
  //   }
  //   this.active = this.selectionBase[2];
  //   console.log(this.active);
  // }

  // back() {
  //   for (let counter in this.styles) {
  //     this.selectionBase[counter] = this.decrement(
  //       this.selectionBase[counter],
  //       4,
  //       0
  //     );
  //     this.styles[counter] = this.sortedStyles[this.selectionBase[counter]];
  //   }
  // }

  // increment(data: number, max: number, min: number): number {
  //   if (data >= max) {
  //     data = min;
  //   } else {
  //     data++;
  //   }
  //   return data;
  // }

  // decrement(data: number, max: number, min: number): number {
  //   if (data <= min) {
  //     data = max;
  //   } else {
  //     data--;
  //   }
  //   return data;
  // }
}
