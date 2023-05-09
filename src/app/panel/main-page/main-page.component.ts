import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    // getting the list of available games
    this.http
      .get(`${this.environment.apiServer}games/list`, {
        responseType: 'json'
      })
      .subscribe(values => {
        this.games = values;
      });

    this.http
      .get(`${this.environment.apiServer}mainPage/list`, {
        responseType: 'json'
      })
      .subscribe({
        next: (value: any) => {
          this.data = value.length > 0 ? value : null;
          if (!this.data) return;
          this.firstSection.patchValue({
            primaryColor: value[0].primaryColor || '#000000',
            secondaryColor: value[0].secondaryColor || '#000000'
          });
          if (!this.data[1]) return;
          this.secondSection.patchValue({
            primaryColor: value[1].primaryColor || '#000000',
            secondaryColor: value[1].secondaryColor || '#000000'
          });
          if (!this.data[2]) return;
          this.thirdSection.patchValue({
            primaryColor: value[2].primaryColor || '#000000',
            secondaryColor: value[2].secondaryColor || '#000000'
          });
          if (!this.data[3]) return;
          this.fourthSection.patchValue({
            primaryColor: value[3].primaryColor || '#000000',
            secondaryColor: value[3].secondaryColor || '#000000'
          });
          if (!this.data[4]) return;
          this.fifthSection.patchValue({
            primaryColor: value[4].primaryColor || '#000000',
            secondaryColor: value[4].secondaryColor || '#000000'
          });
          if (!this.data[5]) return;
          this.sixthSection.patchValue({
            primaryColor: value[5].primaryColor || '#000000',
            secondaryColor: value[5].secondaryColor || '#000000'
          });
          if (!this.data[6]) return;
          this.seventhSection.patchValue({
            primaryColor: value[6].primaryColor || '#000000',
            secondaryColor: value[6].secondaryColor || '#000000'
          });
          if (!this.data[7]) return;
          this.eighthSection.patchValue({
            primaryColor: value[7].primaryColor || '#000000',
            secondaryColor: value[7].secondaryColor || '#000000'
          });
          if (!this.data[8]) return;
          this.ninthSection.patchValue({
            primaryColor: value[8].primaryColor || '#000000',
            secondaryColor: value[8].secondaryColor || '#000000'
          });
          if (!this.data[9]) return;
          this.tenthSection.patchValue({
            primaryColor: value[9].primaryColor || '#000000',
            secondaryColor: value[9].secondaryColor || '#000000'
          });
        }
      });
  }

  environment = environment;

  games: any;
  data: any;

  firstErrorText: any;
  secondErrorText: any;
  thirdErrorText: any;
  fourthErrorText: any;
  fifthErrorText: any;
  sixthErrorText: any;
  seventhErrorText: any;
  eighthErrorText: any;
  ninthErrorText: any;
  tenthErrorText: any;
  eleventhErrorText: any;
  twelvthErrorText: any;
  thirteenthErrorText: any;
  fourteenthErrorText: any;
  fifteenthErrorText: any;

  firstState: any;
  secondState: any;
  thirdState: any;
  fourthState: any;
  fifthState: any;
  sixthState: any;
  seventhState: any;
  eighthState: any;
  ninthState: any;
  tenthState: any;
  eleventhState: any;
  twelvthState: any;
  thirteenthState: any;
  fourteenthState: any;
  fifteenthState: any;

  firstSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  });
  secondSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  });
  thirdSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  });
  fourthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  });
  fifthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  });
  sixthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  seventhSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  eighthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  ninthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  tenthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  eleventhSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  twelvthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  thirteenthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  fourteenthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })
  fifteenthSection = new FormGroup({
    title: new FormControl(),
    primaryColor: new FormControl(),
    secondaryColor: new FormControl(),
    type: new FormControl(),
  })

  submit(index: number) {
    switch (index) {
      case 0:
        this.firstErrorText = '';
        this.firstState = 'progress';
        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.firstSection.value.primaryColor,
            secondaryColor: this.firstSection.value.secondaryColor,
            title: this.firstSection.value.title,
            type: parseInt(this.firstSection.value.type),
          })
          .subscribe({
            next: value => {
              this.firstState = 'confirm';
            },
            error: error => {
              this.firstErrorText = error.error.message;
              this.firstState = 'error';
            }
          });
        break;
      case 1:
        this.secondErrorText = '';
        this.secondState = 'progress';
        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.secondSection.value.primaryColor,
            secondaryColor: this.secondSection.value.secondaryColor,
            title: this.secondSection.value.title,
            type: parseInt(this.secondSection.value.type),
          })
          .subscribe({
            next: value => {
              this.secondState = 'confirm';
            },
            error: error => {
              this.secondErrorText = error.error.message;
              this.secondState = 'error';
            }
          });
        break;
      case 2:
        this.thirdErrorText = '';
        this.thirdState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.thirdSection.value.primaryColor,
            secondaryColor: this.thirdSection.value.secondaryColor,
            title: this.thirdSection.value.title,
            type: parseInt(this.thirdSection.value.type),
          })
          .subscribe({
            next: value => {
              this.thirdState = 'confirm';
            },
            error: error => {
              this.thirdErrorText = error.error.message;
              this.thirdState = 'error';
            }
          });
        break;
      case 3:
        this.fourthErrorText = '';
        this.fourthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.fourthSection.value.primaryColor,
            secondaryColor: this.fourthSection.value.secondaryColor,
            title: this.fourthSection.value.title,
            type: parseInt(this.fourthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.fourthState = 'confirm';
            },
            error: error => {
              this.fourthErrorText = error.error.message;
              this.fourthState = 'error';
            }
          });
        break;
      case 4:
        this.fifthErrorText = '';
        this.fifthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.fifthSection.value.primaryColor,
            secondaryColor: this.fifthSection.value.secondaryColor,
            title: this.fifthSection.value.title,
            type: parseInt(this.fifthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.fifthState = 'confirm';
            },
            error: error => {
              this.fifthErrorText = error.error.message;
              this.fifthState = 'error';
            }
          });
        break;
      case 5:
        this.sixthErrorText = '';
        this.sixthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.sixthSection.value.primaryColor,
            secondaryColor: this.sixthSection.value.secondaryColor,
            title: this.sixthSection.value.title,
            type: parseInt(this.sixthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.sixthState = 'confirm';
            },
            error: error => {
              this.sixthErrorText = error.error.message;
              this.sixthState = 'error';
            }
          });
        break;
      case 6:
        this.seventhErrorText = '';
        this.seventhState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.seventhSection.value.primaryColor,
            secondaryColor: this.seventhSection.value.secondaryColor,
            title: this.seventhSection.value.title,
            type: parseInt(this.seventhSection.value.type),
          })
          .subscribe({
            next: value => {
              this.seventhState = 'confirm';
            },
            error: error => {
              this.seventhErrorText = error.error.message;
              this.seventhState = 'error';
            }
          });
        break;
      case 7:
        this.eighthErrorText = '';
        this.eighthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.eighthSection.value.primaryColor,
            secondaryColor: this.eighthSection.value.secondaryColor,
            title: this.eighthSection.value.title,
            type: parseInt(this.eighthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.eighthState = 'confirm';
            },
            error: error => {
              this.eighthErrorText = error.error.message;
              this.eighthState = 'error';
            }
          });
        break;
      case 8:
        this.ninthErrorText = '';
        this.ninthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.ninthSection.value.primaryColor,
            secondaryColor: this.ninthSection.value.secondaryColor,
            title: this.ninthSection.value.title,
            type: parseInt(this.ninthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.ninthState = 'confirm';
            },
            error: error => {
              this.ninthErrorText = error.error.message;
              this.ninthState = 'error';
            }
          });
        break;
      case 9:
        this.tenthErrorText = '';
        this.tenthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.tenthSection.value.primaryColor,
            secondaryColor: this.tenthSection.value.secondaryColor,
            title: this.tenthSection.value.title,
            type: parseInt(this.tenthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.tenthState = 'confirm';
            },
            error: error => {
              this.tenthErrorText = error.error.message;
              this.tenthState = 'error';
            }
          });
        break;
      case 10:
        this.eleventhErrorText = '';
        this.eleventhState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.eleventhSection.value.primaryColor,
            secondaryColor: this.eleventhSection.value.secondaryColor,
            title: this.eleventhSection.value.title,
            type: parseInt(this.eleventhSection.value.type),
          })
          .subscribe({
            next: value => {
              this.eleventhState = 'confirm';
            },
            error: error => {
              this.eleventhErrorText = error.error.message;
              this.eleventhState = 'error';
            }
          });
        break;
      case 11:
        this.twelvthErrorText = '';
        this.twelvthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.twelvthSection.value.primaryColor,
            secondaryColor: this.twelvthSection.value.secondaryColor,
            title: this.twelvthSection.value.title,
            type: parseInt(this.twelvthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.twelvthState = 'confirm';
            },
            error: error => {
              this.twelvthErrorText = error.error.message;
              this.twelvthState = 'error';
            }
          });
        break;
      case 12:
        this.thirteenthErrorText = '';
        this.thirteenthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.thirteenthSection.value.primaryColor,
            secondaryColor: this.thirteenthSection.value.secondaryColor,
            title: this.thirteenthSection.value.title,
            type: parseInt(this.thirteenthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.thirteenthState = 'confirm';
            },
            error: error => {
              this.thirteenthErrorText = error.error.message;
              this.thirteenthState = 'error';
            }
          });
        break;
      case 13:
        this.fourteenthErrorText = '';
        this.fourteenthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.fourteenthSection.value.primaryColor,
            secondaryColor: this.fourteenthSection.value.secondaryColor,
            title: this.fourteenthSection.value.title,
            type: parseInt(this.fourteenthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.fourteenthState = 'confirm';
            },
            error: error => {
              this.fourteenthErrorText = error.error.message;
              this.fourteenthState = 'error';
            }
          });
        break;
      case 14:
        this.fifteenthErrorText = '';
        this.fifteenthState = 'progress';

        this.http
          .post(`${this.environment.apiServer}mainPage/edit`, {
            accessToken: localStorage.getItem('accessToken'),
            index,
            primaryColor: this.fifteenthSection.value.primaryColor,
            secondaryColor: this.fifteenthSection.value.secondaryColor,
            title: this.fifteenthSection.value.title,
            type: parseInt(this.fifteenthSection.value.type),
          })
          .subscribe({
            next: value => {
              this.fifteenthState = 'confirm';
            },
            error: error => {
              this.fifteenthErrorText = error.error.message;
              this.fifteenthState = 'error';
            }
          });
        break;
      default:
        break;
    }
  }
}
