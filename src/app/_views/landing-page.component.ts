import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor(private router: Router, private sharedService: SharedService) {}
  isClick!: boolean;
  ngOnInit(): void {
    this.sharedService.buttonClick.subscribe((success) => {
      this.isClick = success;
    });
  }
  searchResult() {
    if (this.isClick === true) {
      return this.router.url === '/searchResults';
    }
    return;
  }
  mainPage() {
    return this.router.url === '/';
  }
}
