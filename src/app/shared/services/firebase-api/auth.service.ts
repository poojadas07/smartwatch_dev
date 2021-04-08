import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {SessionStorage} from 'ngx-store';
import {UserModel} from '../../model';
import {DatePipe} from '@angular/common';
import firebase from 'firebase/app';
import User = firebase.User;
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;

@Injectable({providedIn: 'root'})
export class AuthService {
  @SessionStorage() user: UserModel;
  @SessionStorage() isAuthenticated = false;
  @SessionStorage() device = 'Web Admin';
  loginUrl = '/login';

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private datePipe: DatePipe) {

  }

  public updateUser(user: User, userName?: string): Promise<void> {
    return this.afs.doc(`users/${user.uid}`).set({
      uid: user.uid,
      displayName: userName || user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      registerDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      lastDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      balance: 0
    })
      ;
  }

  signWithAnonymous(): Promise<void> {
    return this.afAuth.signInAnonymously()
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }

  signWithEmail(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string, userName: string): Promise<UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }


  githubLogin(): void {
    this.afAuth.signInWithPopup(new auth.GithubAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }

  googleLogin(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }

  twitterLogin(): void {
    this.afAuth.signInWithPopup(new auth.TwitterAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }

  facebookLogin(): void {
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => {
        return this.updateUser(credential.user);
      });
  }
}
