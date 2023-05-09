import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, last, map, ObservableInput, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html'
})
export class EditModalComponent implements OnChanges  {
  constructor(public http: HttpClient , public router : Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.modalType = changes['modalType']?.currentValue ;
  }


  @Input('type') modalType: string | null = null;
  @Output('typeChange') modalTypeChange = new EventEmitter();
  @Input('data') userData:any = null;
  changeInput = new FormControl('');
  confirmInput = new FormControl('');
  errorText: string | null | boolean = null;
  uploadProgress: number = 0;
  environment = environment;

  clearModal() {
    this.modalTypeChange.emit(null);
  }

  selectImage() {
    this.errorText = '';
    let fileSelection: any = document.getElementById('fileSelection');
    fileSelection.click();

    fileSelection.onchange = async () => {
      if (fileSelection.files.length) {
        let fileData = fileSelection.files[0];
        let form: FormData = new FormData();
        let accessToken: string = localStorage.getItem('accessToken') || '';

        form.append('file', fileData, fileData.name);
        form.append('accessToken', accessToken);

        let request = new HttpRequest(
          'POST',
          `${this.environment.apiServer}users/uploadAvatar`,
          form,
          {
            reportProgress: true
          }
        );

        this.http
          .request(request)
          .pipe(
            map(value => {
              if (value.type === HttpEventType.UploadProgress && value.total) {
                this.uploadProgress = value.loaded / value.total;
              }
              //   switch (value.type) {
              //     case HttpEventType.Sent: {
              //       console.log('file sent start ...');
              //       break;
              //     }
              //     case HttpEventType.UploadProgress: {
              //       console.log('upload progress ...');
              //       break;
              //     }
              //     case HttpEventType.ResponseHeader: {
              //       console.log('response header recieved ...');
              //       break;
              //     }
              //     case HttpEventType.DownloadProgress: {
              //       console.log('downloading the response ...');
              //       break;
              //     }
              //     case HttpEventType.Response: {
              //       console.log('response fully recieved ...');
              //       break;
              //     }
              //     default: {
              //       console.log('something else ...');
              //     }
              //   }
              return value;
            }),
            last(),
            catchError(
              (error, caught): ObservableInput<any> => {
                return of([]);
              }
            )
          )
          .subscribe({
            next: value => {
              if (value.status && value.status == 201) {
                window.location.reload()
              } else {
                this.errorText = true;
              }
            },
            error: error => {
              this.errorText = error.message;
            }
          });
      }
    };
  }

  confirmInputChange(){
    this.errorText = '';
    let operation = this.userData.value.name ;

    if(operation == 'number'){
        this.http.post(`${this.environment.apiServer}users/change${operation}` , {
            value : Number(this.changeInput.value) ,
            accessToken : localStorage.getItem('accessToken')
        }
         , {
            responseType : 'json'
         }
        ).subscribe({
            next : (value)=>{
                window.location.reload()
            } ,
            error : (error)=>{
                this.errorText = error.error.message ;
            }
        });
    }else {
        this.http.post(`${this.environment.apiServer}users/change${operation}` , {
            value : this.changeInput.value ,
            accessToken : localStorage.getItem('accessToken')
        }
         , {
            responseType : 'json'
         }
        ).subscribe({
            next : (value)=>{
                window.location.reload()
            } ,
            error : (error)=>{
                this.errorText = error.error.message ;
            }
        });
    }
  }

  sendConfirmEmail(email: string){
    this.http.get(`${this.environment.apiServer}users/emailConfirm/${localStorage.getItem("accessToken")}`,{ responseType : 'json' }).subscribe({
      error : (error)=>{
        this.errorText = 'خطایی رخ داد';
      }
    })

    return true;
  }

  confirmInputConfirm(){
    let key = parseInt(this.confirmInput.value || "0")
    // basic validation
    if(key < 0){
      this.errorText = 'کد تاییدی باید عددی مثبت باشد'
      return;
    }else if(key > 99999){
      this.errorText = 'کدی 5 رقمی وارد کنید'
      return;
    }

    this.http.post(`${this.environment.apiServer}users/emailConfirm`,{
      accessToken: localStorage.getItem('accessToken'),
      key,
    }).subscribe({
      next : (value : any)=>{
        window.location.reload();
      },
      error : (error)=>{
        this.errorText = error.error.message;
      }
    })
  }

}
