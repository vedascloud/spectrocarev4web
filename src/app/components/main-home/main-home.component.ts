import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
  providers: [NgbCarouselConfig]
})
export class MainHomeComponent implements OnInit {

  images = ["/assets/images/hospital-5.jpg", "/assets/images/hospital-6.jpg","/assets/images/hospital-7.jpg"].map((n) => n);

  public datafromServer:any;
  constructor(private loginService:LoginService,private config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    // setInterval(corousel => {
      
    // })
    
  }

  ngOnInit() {
    
    
      // this.config.wrap = false;
      // this.config.keyboard = false;
      // this.config.pauseOnHover = false;
    // this.loginService.getData().subscribe((res)=>{
    //   if (res[0].response == "3" ){
    //     console.log(res);
    //     this.datafromServer = res[0].products;
    //   }
    // },(err:HttpErrorResponse)=>{
    //   if (err.error instanceof Error){
    //     console.log("Client Side Error");
    //   }
    //   else{
    //     console.log(err);
    //   }
    // })
  }

}
