import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PlaceHolderDirective } from 'src/app/shared/placeholder.directive';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost!: PlaceHolderDirective;
  private closeSUb!: Subscription;
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRe: ViewContainerRef
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      fName: [''],
      lName: [''],
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const fName = this.loginForm.value.fName;
    const lName = this.loginForm.value.lName;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authServices.login(email, password);
    } else {
      authObservable = this.authServices.signUp(email, password, fName, lName);
    }
    authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        localStorage.setItem('token', resData.idToken);
        this.router.navigate(['/products']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    this.loginForm.reset();
  }
  handelError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSUb) {
      this.closeSUb.unsubscribe();
    }
  }
}
