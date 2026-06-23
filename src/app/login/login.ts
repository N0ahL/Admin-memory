import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router)

   username = ''
   password = ''

  async onSubmit(){
     const logInData ={
       username: this.username,
       password: this.password
     }
     const response = await fetch('http://localhost:8000/memory/login', {
       method: "post",
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify(logInData)
     });

     if(!response.ok){
       alert('Verkeerde inloggegevens')
     }

     if(response.ok){
       const data = await response.json();
       if(this.username === 'Henk'){
         localStorage.setItem('token', data.token)
         await this.router.navigate(['/admin'])
       } else {
         alert(this.username + ' heeft geen admin rechten!')
       }
     }

   }

}
