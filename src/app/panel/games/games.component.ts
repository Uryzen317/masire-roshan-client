import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
})
export class GamesComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.editGameSearch.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        filter((value) => value.length > 2),
        switchMap((value) => {
          return ajax(`${this.environment.apiServer}games/search/${value}`);
        })
      )
      .subscribe({
        next: (value) => {
          this.editGameGames = value.response;
        },
      });

    this.deleteGameSearch.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(250),
        filter((value) => value.length > 2),
        switchMap((value) => {
          return ajax(`${this.environment.apiServer}games/search/${value}`);
        })
      )
      .subscribe({
        next: (value) => {
          this.deleteGameGames = value.response;
        },
      });
  }
  environment = environment;

  //adding game section
  addGameTitle = new FormControl();
  addGameForm = new FormData();
  addGameErrorText: string | null = null;
  addGameState: null | string = null;

  addGameFileSelect() {
    let fileSelection: any = document.getElementById('addGameFile');
    fileSelection?.click();
    fileSelection.onchange = (event: any) => {
      if (fileSelection.files.length > 0) {
        this.addGameForm.set(
          'file',
          fileSelection.files[0],
          fileSelection.files[0].name
        );
      }
    };
  }

  addGameDone() {
    this.addGameErrorText = null;
    this.addGameState = 'progress';
    this.addGameForm.set(
      'accessToken',
      localStorage.getItem('accessToken') || ''
    );
    this.addGameForm.set('title', this.addGameTitle.value);

    this.http
      .post(`${this.environment.apiServer}games/add`, this.addGameForm, {
        responseType: 'json',
      })
      .subscribe({
        next: (value) => {
          this.addGameState = 'confirm';
          this.addGameErrorText = null;
        },
        error: (error) => {
          this.addGameState = 'error';
          this.addGameErrorText = 'خطا ، مجددا امتحان کنید';
        },
      });
  }

  //editing game section
  editGameSearch = new FormControl();
  editGameGames: any;
  editGameErrorText: string | null = null;
  editGameForm = new FormData();
  editGameState: null | string = null;
  editGameTitle: string = '';
  editGameNewTitle = new FormControl();

  editGameSelect(name: string) {
    this.editGameGames = null;
    this.editGameTitle = name;
  }

  editGameFileSelect() {
    let fileSelection: any = document.getElementById('editGameFile');
    fileSelection?.click();
    fileSelection.onchange = (event: any) => {
      if (fileSelection.files.length > 0) {
        this.editGameForm.set(
          'file',
          fileSelection.files[0],
          fileSelection.files[0].name
        );
      }
    };
  }

  editGameDone() {
    this.editGameErrorText = null;
    this.editGameState = 'progress';
    this.editGameForm.set(
      'accessToken',
      localStorage.getItem('accessToken') || ''
    );
    this.editGameForm.set('title', this.editGameTitle);
    this.editGameForm.set('newTitle', this.editGameNewTitle.value);

    this.http
      .patch(`${this.environment.apiServer}games/edit`, this.editGameForm, {
        responseType: 'json',
      })
      .subscribe({
        next: (value) => {
          this.editGameState = 'confirm';
          this.editGameErrorText = null;
        },
        error: (error) => {
          this.editGameState = 'error';
          this.editGameErrorText = error.error.message;
        },
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
        `${this.environment.apiServer}games/delete`,
        {
          accessToken: localStorage.getItem('accessToken'),
          title: this.deleteGameTitle,
        },
        {
          responseType: 'json',
        }
      )
      .subscribe({
        next: (value) => {
          this.deleteGameState = 'confirm';
          this.deleteGameErrorText = null;
        },
        error: (error) => {
          this.deleteGameState = 'error';
          this.deleteGameErrorText = 'خطا ، مجددا امتحان کنید';
        },
      });
  }
}
