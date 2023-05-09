import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationService } from "./services/registration.service";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
})
export class PanelComponent implements OnInit {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public registrationService: RegistrationService
  ) {}

  modalType: any = null;
  data: any = null;
  operation: number = 0;
  regState: any;
  x: any;

  ngOnInit(): void {
    let isCached = this.registrationService.regCache;
    if (!isCached) {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) this.router.navigate(["/"]);

      this.registrationService.regState.subscribe({
        next: (value: any) => {
          if (value) {
            this.regState = value.role;
            this.validatePath();
            console.log("reading by service");
          } else {
            this.router.navigate(["/"]);
          }
        },
      });
    } else {
      this.regState = isCached.role;
      this.validatePath();
      console.log("reading by cache");
    }
  }

  recallWithNull() {
    this.modalType = "sdfsd";
  }

  validatePath() {
    this.route.params.subscribe({
      next: (value) => {
        switch (value["operation"]) {
          case "personal-account": {
            this.operation = 0;
            break;
          }
          case "posts": {
            if (this.regState !== "admin" && this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 1;
            }
            break;
          }
          case "games": {
            if (this.regState !== "admin" && this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 2;
            }
            break;
          }
          case "tags": {
            if (this.regState !== "admin" && this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 3;
            }
            break;
          }
          case "main-page": {
            if (this.regState !== "admin" && this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 4;
            }
            break;
          }
          case "logs": {
            if (this.regState !== "admin" && this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 5;
            }
            break;
          }
          case "admins": {
            if (this.regState !== "god") {
              this.operation = 0;
            } else {
              this.operation = 6;
            }
            break;
          }
          default: {
            this.operation = 0;
          }
        }
      },
    });
  }
}
