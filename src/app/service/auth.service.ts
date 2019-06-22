import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDetails
  display:any
  // lError

  constructor(public FirebaseAuth:AngularFireAuth,public router:Router) {
    this.FirebaseAuth.authState.subscribe(user => {
      if(user){
        this.userDetails = user
      }
    })
   }

  logIn(email,password){
    this.FirebaseAuth.auth.signInWithEmailAndPassword(email,password).then(data=>{
      console.log(data)
      this.router.navigateByUrl('/home')
    }).catch(err=>{
      // this.lError = err
      alert(err )
      console.log(err)
    })
  }
  addUser(email,password){
    this.FirebaseAuth.auth.createUserWithEmailAndPassword(email,password).then(data=>{
      console.log(data)
      this.router.navigateByUrl('/home')
     }).catch(err=>{
       alert(err)
      console.log(err)
     })
  }
  isAuthenticated(){
    if(this.userDetails){
      return true;
    }
    else {
      return false;
    }
  }
  getEmail(){
    console.log(this.userDetails)
    return this.userDetails.user.email
  }
}
