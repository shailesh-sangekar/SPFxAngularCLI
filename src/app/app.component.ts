import { Component, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';

import { Version } from '@microsoft/sp-core-library';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormsModule, NgForm } from '@angular/forms';
import {TransportModel} from '../Model/TransportModel';

import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AuthInfo } from '../shared/models/authInfo';
//import { User } from '../../shared/models/loginUser';
import { CommonService } from '../shared/services/common.service';
import { AuthTokenService } from '../shared/services/authToken.service';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

styles: [`
  .heart {
    background-color: red;
    display: inline-block;
    height: 10px;
    margin: 0 3px;
    position: relative;
    top: 0;
    transform: rotate(-45deg);
    width: 10px;
    -webkit-animation: heartbig_animation 0.8s infinite;
    -moz-animation: heartbig_animation 0.8s infinite;
    -o-animation: heartbig_animation 0.8s infinite;
    animation: heartbig_animation 0.8s infinite;
  }
  .heart:before,
  .heart:after {
    content: "";
    background-color: red;
    border-radius: 50%;
    height: 10px;
    position: absolute;
    width: 10px;
  }
  .heart:before {
    top: -5px;
    left: 0;
  }
  .heart:after {
    left: 5px;
    top: 0;
  }
  @-webkit-keyframes heartbig_animation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 0; }}
    @-moz-keyframes heartbig_animation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 0; }}
    @-o-keyframes heartbig_animation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 0; }}
    @keyframes heartbig_animation {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 0; }}
  `]
})

export class AppComponent implements OnInit {
  public TransportObj = new TransportModel;
  model: AuthInfo;
  loggedInUser: string;
  loginName: string;
  errorMessage: string;
  loggedInUserData: any;

  constructor(private _router: Router
              , private _commonService: CommonService
              , private _authTokenService: AuthTokenService
              , elm: ElementRef
              , private http:Http
            ) {
    this.model = new AuthInfo('password', '', '');
}

ngOnInit() {
  this.loggedInUser = 'ankit.panchal';
  this.loginName = 'ankit.panchal';

  if (this._authTokenService.authToken === '') {
      this.getAuthToken();
  } else {
      if (this._authTokenService.loggedInUserData !== undefined) {
          this.loggedInUserData = JSON.parse(this._authTokenService.loggedInUserData);
      } else {
          this._router.navigate(['/unauthorized', 1]);
      }
  }
}
/** Entry Point */
getAuthToken() {
  console.log('in getAuthToken');
  this.model.UserName = this.loginName;
  this.model.Password = 'Espl@123';
  this._commonService.getAuthToken(this.model)
      .subscribe(
          (results: any) => {
              console.log('Access grated for current user');
              console.log(results);
          },
          error => {
              this.errorMessage = <any>error;
              this._router.navigate(['/unauthorized', 1]);
          });
}

  submitTransportData($event: Event) {
      console.log(this.TransportObj);

      if(this.TransportObj.FirstName === ""){
        
      }
  }

}
