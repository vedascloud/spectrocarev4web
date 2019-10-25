import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { FormGroup } from '@angular/forms';

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
    (this.router.url !="/medicalpersonnelsignup") && (this.router.url != "/forgot") &&
     (this.router.url !="/termsandconditions") && (this.router.url != "/privacypolicy")&&
     (this.router.url != "/changepassword") ){
      return true
    }
      return false;
  }

  // adminsignup: FormGroup;
}
