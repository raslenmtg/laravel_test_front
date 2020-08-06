import {Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import {CoreServiceService} from '../core/core-service.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testfront';
  arg:any;
  gold:any;
  constructor(private coreservice:CoreServiceService){}
  ngOnInit() {
  this.coreservice.getrates().subscribe(data=>{
   // console.log( data.filter(d=>d.quote_currency=='USD').map(e=>{return parseFloat( e.average_midpoint);}).sort())
    var ctx = document.getElementById('currency');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels:data.filter(d=>d.quote_currency=='AUD').map(e=>{return e.start_time.substr(0,10);}).sort() ,
        datasets: [{
          label: 'AUD',
          data:  data.filter(d=>d.quote_currency=='AUD').map(e=>{return parseFloat( e.average_midpoint);}).sort(),
          borderColor: "#cdc41b",
          borderWidth: 1,
          fill: false,
        },
          {
            label: 'USD',
            data:  data.filter(d=>d.quote_currency=='USD').map(e=>{return  parseFloat(e.average_midpoint);}).sort(),
            borderColor: "#23cd59",
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'EUR',
            data:  data.filter(d=>d.quote_currency=='EUR').map(e=>{return parseFloat( e.average_midpoint)}).sort(),
            borderColor: "#c7cd32",
            borderWidth: 1,
            fill: false,
          },
          {
            label: 'CAD',
            data:  data.filter(d=>d.quote_currency=='CAD').map(e=>{return  parseFloat( e.average_midpoint)}).sort(),
            borderColor: "#c42fcd",
            borderWidth: 1,
            showLine:true,
            fill: false,
          }
        ]},
      options: {
        responsive: false,
      }});
  })


    this.coreservice.getvirtualrates().subscribe(data=>{

      var ctx1 = document.getElementById('virtual');
      var myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
          labels:data.filter(d=>d.quote_currency=='BTC').map(e=>{return e.start_time.substr(0,10);}) ,
          datasets: [{
            label: 'BTC',
            data:  data.filter(d=>d.quote_currency=='BTC').map(e=>{return parseFloat( e.average_midpoint);}),
            borderColor: "#cdc41b",
            borderWidth: 1,
            fill: false,
          },
            {
              label: 'ETH',
              data:  data.filter(d=>d.quote_currency=='ETH').map(e=>{return  parseFloat(e.average_midpoint);}),
              borderColor: "#23cd59",
              borderWidth: 1,
              fill: false,
            }
          ]},
        options: {
          responsive: false,
        }});

    })

  let timer=interval(1000);
  timer.subscribe(()=>{
    console.log(1)
    this.coreservice.getmetalrates().subscribe(data=>{
      this.arg=data.find(d=>d.quote_currency=='XAG').average_midpoint
      this.gold=data.find(d=>d.quote_currency=='XAU').average_midpoint
    })
  })





  }

}
