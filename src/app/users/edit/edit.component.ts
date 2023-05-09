import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  constructor(public http: HttpClient) {
    // select achievement images
    for(let counter = 0; counter < 58 ; counter++){
      let lengthDiff = counter.toString();
      for(; lengthDiff.length < 3;){
        lengthDiff = '0' + lengthDiff;
      }
      this.images[counter] = lengthDiff;
    }
    
    // select backgorund imgages
    for(let counter = 0; counter < 5 ; counter++){
      let lengthDiff = counter.toString();
      for(; lengthDiff.length < 3;){
        lengthDiff = '0' + lengthDiff;
      }
      this.bgImages[counter] = lengthDiff;
    }
  }

  ngOnInit(): void {
    this.http.get(`${this.environment.apiServer}bio/get/${this.id}`, { responseType: 'json' })
      .subscribe({ next: (value : any)=>{
        this.goals = value.goals;
        this.achievements = value.achievements;
        this.skills = value.skills;
        this.callInfo = value.callInfo;
        this.activeBg = value.background;
        this.bio.setValue(value.bio);
      }, error: (error)=>{
      
      }})
  }
  
  @Input() id: string = '';
  environment:any = environment;
  images: string[] = [];
  bgImages: string[] = [];
  activeBg: string = '000';
  
  bio = new FormControl('');
  goals : string[] = [];
  achievements : {achievement: string, avatar: string}[] = [];
  activeAchievement : string = '000';
  skills : {skill: string, value: number}[] = [];
  callInfo : {platform: string, value: string;}[] = [];
  
  addGoal(goal: string){
    if(this.goals.find(g => g == goal) || !goal) return;
    this.goals.push(goal)
  }
  
  removeGoal(goal: string){
    this.goals = this.goals.filter(g => g !== goal)
  }
  
  addSkill(skill: string, value: number){
    if(this.skills.find(s => s.skill == skill) || !skill || !Number(value)) return ;
    this.skills.push({skill, value});
  }
  
  removeSkill(skill: string){
    this.skills = this.skills.filter(s => s.skill !== skill);
  }
  
  addAchievement(achievement: string){
    if(this.achievements.find(a => a.achievement == achievement) || !achievement) return ;
    this.achievements.push({achievement, avatar: this.activeAchievement});
  }
  
  removeAchievement(achievement: string){
    this.achievements = this.achievements.filter(a => a.achievement !== achievement);
  }
  
  submit(){
    this.http.post(`${this.environment.apiServer}bio/set`,{
      accessToken: localStorage.getItem('accessToken'),
      bio: this.bio.value,
      goals: this.goals,
      achievements: this.achievements,
      skills: this.skills,
      callInfo: this.callInfo,
      background: this.activeBg,
    },{ responseType: 'json' }).subscribe({next: (value: any)=>{
    
    }, error: (error: any)=>{
      
    }})
  }
}
