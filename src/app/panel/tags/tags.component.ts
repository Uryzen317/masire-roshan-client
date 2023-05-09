import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.editGameSearch.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        filter(value => value.length > 2),
        switchMap(value => {
          return ajax(`${this.environment.apiServer}tags/search/${value}`);
        })
      )
      .subscribe({
        next: value => {
          this.editGameGames = value.response;
        }
      });

    this.deleteGameSearch.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        filter(value => value.length > 2),
        switchMap(value => {
          return ajax(`${this.environment.apiServer}tags/search/${value}`);
        })
      )
      .subscribe({
        next: value => {
          this.deleteGameGames = value.response;
        }
      });
  }

  environment = environment;

  //adding game section
  addGameTitle = new FormControl();
  addGameErrorText: string | null = null;
  addGameState: null | string = null;

  addGameDone() {
    this.addGameErrorText = null;
    this.addGameState = 'progress';

    this.http
      .post(
        `${this.environment.apiServer}tags/add`,
        {
          accessToken: localStorage.getItem('accessToken'),
          title: this.addGameTitle.value
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          this.addGameState = 'confirm';
          this.addGameErrorText = null;
        },
        error: error => {
          this.addGameState = 'error';
          this.addGameErrorText = 'خطا ، مجددا امتحان کنید';
        }
      });
  }

  //editing game section
  editGameSearch = new FormControl();
  editGameGames: any;
  editGameErrorText: string | null = null;
  editGameState: null | string = null;
  editGameTitle: string = '';
  editGameNewTitle = new FormControl();

  editGameSelect(name: string) {
    this.editGameGames = null;
    this.editGameTitle = name;
  }

  editGameDone() {
    this.editGameErrorText = null;
    this.editGameState = 'progress';
    this.http
      .patch(
        `${this.environment.apiServer}tags/edit`,
        {
          accessToken: localStorage.getItem('accessToken'),
          title: this.editGameTitle,
          newTitle: this.editGameNewTitle.value
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          this.editGameState = 'confirm';
          this.editGameErrorText = null;
        },
        error: error => {
          this.editGameState = 'error';
          this.editGameErrorText = 'خطا ، مجددا امتحان کنید';
        }
      });
  }

  //deleting game
  deleteGameSearch = new FormControl();
  deleteGameGames: any;
  deleteGameTitle: string = '';
  deleteGameErrorText: string | null = null;
  deleteGameState: null | string = null;

  deleteGameSelect(name: string) {
    this.deleteGameGames = null;
    this.deleteGameTitle = name;
  }

  deleteGameDone() {
    this.deleteGameErrorText = null;
    this.deleteGameState = 'progress';

    this.http
      .patch(
        `${this.environment.apiServer}tags/delete`,
        {
          accessToken: localStorage.getItem('accessToken'),
          title: this.deleteGameTitle
        },
        {
          responseType: 'json'
        }
      )
      .subscribe({
        next: value => {
          this.deleteGameState = 'confirm';
          this.deleteGameErrorText = null;
        },
        error: error => {
          this.deleteGameState = 'error';
          this.deleteGameErrorText = 'خطا ، مجددا امتحان کنید';
        }
      });
  }
}
