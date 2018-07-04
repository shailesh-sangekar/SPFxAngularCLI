import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { RouterModule, Routes } from '@angular/router';
import { AuthInfo } from '../../shared/models/authInfo';
//import { User } from '../../shared/models/loginUser';
import { CommonService } from '../../shared/services/common.service';
import { AuthTokenService } from '../../shared/services/authToken.service';

import { Version } from '@microsoft/sp-core-library';

import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

@Component({
    selector: 'frci-transport',
    templateUrl: 'transport.component.html',
    styles: ['transport.component.css'],
    providers: [RouterModule]
})
export class TransportComponent implements OnInit {
    @Input() description = 'Angular';
    /** Model Variable */
    model: AuthInfo;
    loggedInUser: string;
    loginName: string;
    errorMessage: string;
    loggedInUserData: any;

    constructor(private _router: Router, private _commonService: CommonService, private _authTokenService: AuthTokenService,
        elm: ElementRef) {
        this.description = elm.nativeElement.getAttribute('description');
        this.model = new AuthInfo('password', '', '');
    }
    ngOnInit() {
        this.loggedInUser = 'shailesh.sangekar';
        this.loginName = 'SHAILESH.SANGEKAR';


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
        this.model.UserName = this.loginName;
        this.model.Password = '';
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



}
