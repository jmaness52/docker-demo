import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { Auth, GoogleAuthProvider, signInWithPopup, user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'client';
  protected auth = inject(Auth);
  protected user$ = user(this.auth);

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
  }
  logout() {
    this.auth.signOut();
  }
}
