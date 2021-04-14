import { Component, OnInit} from '@angular/core';
import { LoginFacade } from '@elektro-braun/auth/domain';

@Component({
  selector: 'elektro-braun-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



    constructor(private loginFacade: LoginFacade) {
    }


    ngOnInit() {
    }

}

