import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spectrocarev4web';
  constructor(private router:Router){}
  isValid():Boolean{
    if((this.router.url !="/")&& (this.router.url !="/adminsignin")&&(this.router.url !="/adminsignup")&&
    (this.router.url !="/medicalpersonnelsignup")){
      return true
    }
    else{
      return false;
    }
  }
}
