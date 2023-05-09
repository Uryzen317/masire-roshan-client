import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { distinctUntilChanged, debounceTime, filter, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
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
      
    this.tagsSearch.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(250),
      filter((value : any)=>{
        if(value.length > 2) return true;
        this.tagsResults = [];
        return false;
      }),
      switchMap((value)=>{return ajax.get(`${this.environment.apiServer}tags/search/${value}`)})
    ).subscribe({
      next : (value : any)=>{
        this.tagsResults = value.response;
      }
    }) 
  }

  games: any = []; // list of games
  fields: any = []; // list of informations
  files: FormData = new FormData(); // files , list of data , ...

  //   sizeControl: any = new FormControl();
  //   forControl: any = new FormControl();
  uploadProgress: any = 0;
  addGameState: any = 0;
  errorText: any;
  tagsResults: any = [];
  tagsList : string[] = [];
  //   copyright = new FormControl();
  environment = environment;
  tagsSearch = new FormControl("");
  uploadForm = new FormGroup({
    title: new FormControl(), // name of the selected subject
    desc: new FormControl(""), // description of the post
    copyright: new FormControl('public'), //copyright claim state
    name: new FormControl(""), // post name
    fileTitle: new FormControl(),
    fileType: new FormControl(),
    sizeControl: new FormControl(),
    forControl: new FormControl(),
  });

  selectFile() {
    this.errorText = "";
    let fileSelection: any = document.getElementById('fileSelection');
    //fields data is provided
    if (this.uploadForm.value.fileTitle && this.uploadForm.value.fileType) {
      fileSelection.click();
    }
    fileSelection.onchange = () => {
      if (
        fileSelection.files.length > 0 &&
        //check for uniquness
        this.fields.filter((field: any) => {
          return field.name == fileSelection.files[0].name;
        }).length == 0
      ) {
        let fileName = fileSelection.files[0].name;
        //files buffer
        this.files.append(fileName, fileSelection.files[0], fileName);
        //files data
        this.fields.push({
          name: fileName,
          type: this.uploadForm.value.fileType,
          title: this.uploadForm.value.fileTitle
        });
      }
    };
  }

  selectAvatar() {
    let fileSelection: any = document.getElementById('avatarSelection');
    fileSelection.click();
    fileSelection.onchange = () => {
      if (fileSelection.files.length > 0) {
        this.files.set(
          'avatar',
          fileSelection.files[0],
          fileSelection.files[0].name
        );
      }
    };
  }

  deleteFile(name: any) {
    this.files.delete(name);

    let targetField: any;
    for (let counter in this.fields) {
      if (this.fields[counter].name === name) {
        targetField = counter;
        break;
      }
    }
    this.fields.splice(targetField, 1);
  }

  submit() {
    if(this.addGameState == 'progress') return;
  
    this.addGameState = 'progress';
    this.uploadProgress = 0;
    this.errorText = '';
    this.files.set('title', this.uploadForm.value.title || "");
    this.files.set('desc', this.uploadForm.value.desc || "");
    this.files.set('fields', JSON.stringify(this.fields));
    this.files.set('copyright', this.uploadForm.value.copyright || '');
    this.files.set('accessToken', localStorage.getItem('accessToken') || '');
    this.files.set('tags', JSON.stringify(this.tagsList));
    this.files.set('name', this.uploadForm.value.name || "");

    let request = new HttpRequest(
      'post',
      `${this.environment.apiServer}posts/add`,
      this.files,
      {
        reportProgress: true
      }
    );

    this.http.request(request).subscribe({
      next: value => {
        if (value.type === HttpEventType.UploadProgress && value.total) {
          this.uploadProgress = value.loaded / value.total;
          this.addGameState = 'progress';
        }
      },
      error: error => {
        this.errorText = error;
        this.addGameState = 'error';
      },
      complete : ()=>{
        this.errorText = null;
        this.addGameState = 'confirm';
      }
    });
  }
  
  addTag(name : string){
    let isUnique = this.tagsList.find((tag)=>{ return tag == name });
    console.log(isUnique)
    if(isUnique) return;
    this.tagsList.push(name);
  }
  
  removeTag(name : any){
    this.tagsList = this.tagsList.filter((tag)=>{ return tag != name })
  }
}
