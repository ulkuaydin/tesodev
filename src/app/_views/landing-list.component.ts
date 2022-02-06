import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

import { UsersService } from './users.service';

@Component({
  selector: 'app-landing-list',
  templateUrl: './landing-list.component.html',
  styleUrls: ['./landing-list.component.scss'],
})
export class LandingListComponent implements OnInit {
  data!: string[];
  sliceData: string[] = [];
  filterData: string[] = [];
  filterString!: string;
  filterStringClicked!: string;
  currentPage = 0;
  isClick!: boolean;
  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    private changeDedector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sharedService.currentData.subscribe((data3) => {
      this.data = data3;
    });
    this.sharedService.currentFilterString1.subscribe((filterStringService) => {
      this.filterStringClicked = filterStringService;
    });
    this.sharedService.buttonClick.subscribe((success) => {
      this.isClick = success;
    });
    this.usersService.getUsers().subscribe(
      (success) => {
        var success1 = success.data;

        this.data = success1;

        this.sliceData = this.data.slice(
          this.currentPage * 5,
          this.currentPage * 5 + 5
        );
        console.log(this.filterData);
        console.log(this.sliceData);
      },
      (error) => {
        return 'Hata var';
      }
    );
    this.changeDedector.detectChanges();
  }
  PageIndex(index: number) {
    if (index < this.data.length / 5) {
      return Math.abs(this.currentPage - index) < 5;
    }
    return;
  }

  indecreaseCurrent() {
    this.currentPage = this.currentPage + 1;
  }
  decreaseCurrent() {
    this.currentPage = this.currentPage - 1;
  }
  onClick() {
    this.filterStringClicked = this.filterString;
    this.filterData = this.data.filter((item) => {
      return (
        item[0].toLowerCase().includes(this.filterStringClicked) ||
        item[0].toUpperCase().includes(this.filterStringClicked)
      );
    });
    console.log(this.filterStringClicked);
    this.currentPage = 0;
    this.isClick = true;
    this.sharedService.sharedFilterString1(this.filterStringClicked);
    this.sharedService.sharedButtonClick(this.isClick);

    console.log(this.isClick);
  }

  currentEnd() {
    return (
      Math.round(this.data.length / 5 - 1) ||
      Math.round(this.filterData.length / 5 - 1)
    );
  }
}
