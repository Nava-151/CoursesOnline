import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  imports: [MatButtonModule, FormsModule, ReactiveFormsModule,MatIconModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,RouterModule
  ],
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  @Input() isVisible = false;
  // dialogRef: MatDialogRef<RegisterModalComponent>

  user: User = new User(1, '', '', '', '');

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
  ) { }

  credentials = { email: '', password: '' };
  onSubmit() {
    console.log("on submit");
    this.user.name = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    
    this.authenticationService.register(this.user).subscribe(res => {
      console.log(res)
      localStorage.setItem("id", res.id);
      sessionStorage.setItem("token", res.token);
      this.authenticationService.isLoggedIn = true;
      this.authenticationService.isTeacher = this.user.role == "teacher" ? true : false;
      this.route.navigate(['courses']);
    });
  }

  onCheckboxChange() {
    this.user.role == "teacher" ? this.user.role = "student" : this.user.role = "teacher";
  }

  closeModal(): void {
    // this.dialogRef.close();
  }

}
