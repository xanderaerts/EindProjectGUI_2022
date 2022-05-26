import { Component, OnInit } from '@angular/core';
import { TankBeurtenService } from '../services/tank-beurten.service';
import { tankBeurt } from '../tankbeurt.model'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [TankBeurtenService]
})
export class HomepageComponent implements OnInit {

  totLiters = 0;
  totPrice = 0;
  totKm = 0;


  constructor(public tankBeurtService: TankBeurtenService) {
    this.calcTotConsumpions();
   }

  ngOnInit(): void {
  }

  calcTotConsumpions(){
    let tankbeurten : tankBeurt[] = [];
    this.tankBeurtService.getList().subscribe(
      (response : tankBeurt[]) => {
        tankbeurten = response;
        for(let i = 0;i<tankbeurten.length;i++){
          this.totLiters += tankbeurten[i].totLiters;
          this.totPrice += tankbeurten[i].totPrice;
          this.totKm += tankbeurten[i].kmStand;
        }
    
      },
      (error) => console.log("error:",error),
      () => console.log("ready")
    );
  }

  calcTotAvg(){
    
    var gem = (this.totLiters) * 100 /this.totKm;
    return Math.round((gem + Number.EPSILON)*100 ) / 100  }



}
