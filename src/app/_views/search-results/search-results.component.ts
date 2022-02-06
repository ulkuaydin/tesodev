import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  data!: string[];
  filteredData: string[] = [];
  filterString!: string;
  filteredYear: any;
  sortingYear!: string;
  currentPage = 0;
  isSortOpen = false;
  isClick!: boolean;
  isYearClick = false;
  mapData!: string[];
  filteredYear1!: string[];

  constructor(
    private sharedService: SharedService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.sharedService.currentData.subscribe((sharedData) => {
      this.data = sharedData;
    });
    this.sharedService.currentFilterString1.subscribe((filterString1) => {
      this.filterString = filterString1;
    });
    this.sharedService.buttonClick.subscribe((success) => {
      this.isClick = success;
    });
    this.usersService.getUsers().subscribe(
      (success) => {
        var successMap = success.data;

        this.data = successMap;
        this.filteredData = this.data.filter((item) => {
          return (
            item[0].toLowerCase().includes(this.filterString) ||
            item[0].toUpperCase().includes(this.filterString)
          );
        });

        console.log(this.data);
        console.log(this.filteredData.length);
      },
      (error) => {
        return 'Hata var';
      }
    );
    console.log(this.isClick);
  }

  toggleSort() {
    this.isSortOpen = !this.isSortOpen;
    console.log(this.isSortOpen);
  }
  PageIndex(index: number) {
    if (index < this.filteredData.length / 5) {
      return Math.abs(this.currentPage - index) < 5;
    }
    return;
  }
  nameAscending() {
    this.filteredData.sort();
    this.currentPage = 0;
  }
  nameDescending() {
    this.filteredData.sort().reverse();
    this.currentPage = 0;
  }
  yearAscending() {
    this.filteredYear = this.filteredData.map((item) => {
      const date = new Date(item[3]);

      return [item[0], item[1], item[2], date, item[4], item[5]];
    });

    this.filteredData = this.filteredYear.sort((a: any, b: any) => {
      return a[3] - b[3];
    });

    this.currentPage = 0;
    console.log(this.filteredData);
  }
  yearDescending() {
    this.filteredYear = this.filteredData.map((item) => {
      const date = new Date(item[3]);

      return [item[0], item[1], item[2], date, item[4], item[5]];
    });

    this.filteredData = this.filteredYear.sort((a: any, b: any) => {
      return b[3] - a[3];
    });
    this.currentPage = 0;
  }
  currentEnd() {
    return Math.round(this.filteredData.length / 5);
  }
}
