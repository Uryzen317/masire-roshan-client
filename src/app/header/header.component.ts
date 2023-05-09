import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistrationService } from '../panel/services/registration.service';
import { Router, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(public registrationService: RegistrationService, public router : Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event)=>{ 
      if(event instanceof NavigationEnd || NavigationError || NavigationCancel){
        this.isLoaded = true;
      }
    })
  
    this.registrationService.regState.subscribe({
      next: (value : any) => {
        if (value) {
          this.isLoggedIn = true;
          this.user = value;
          this.regState=value.role;
        } else {
          this.isLoggedIn = false;
          this.user = null;
          this.regState=null;
        }
      },
      error: error => {
        this.isLoggedIn = false;
        this.user = null;
      }
    });
  }

  isLoggedIn!: boolean ;
  user!: any;
  environment = environment;
  regState : string | null = null;
  isMenuOpen : boolean = false;
  isLoaded : boolean = false;
  isFolded : boolean = true;
  
  logout(){
    this.registrationService.logout();
  }
}
