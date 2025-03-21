

import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports:[MatButtonModule, LoginModalComponent, RegisterModalComponent,MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginModalVisible :boolean= false;
  isRegisterModalVisible : boolean= false;
  openLoginModal() {
    this.isLoginModalVisible = true;
  }
  openRegisterModal() {
    this.isRegisterModalVisible=true;
      }
}