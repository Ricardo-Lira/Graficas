import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData:Array<any> = [
    {data: [0, 0, 0, 0,], label: 'Ventas'},
    
   
  ];
  public lineChartLabels:Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril'];

  public lineChartColors:Array<any> = [
    { //Grafica color
      backgroundColor: 'rgba(102, 87, 247,.8)',
      borderColor: 'rgba(204,16,39,1)',
      pointBackgroundColor: 'rgba(45,49,51,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }]

  constructor( private _http:HttpClient, public wsService:WebsocketService) { }

  ngOnInit() {

    this.getData();
    this.listenSocket();

    
    // setInterval( () =>{

    //   const newData = [
        
    //    Math.round(Math.random() * 100),
    //    Math.round(Math.random() * 100),
    //    Math.round(Math.random() * 100),
    //    Math.round(Math.random() * 100),

    //   ];

    //   this.lineChartData = [
    //     {data: newData, label: 'Ventas'}
    //   ];
      
      
    // },3000)
  }

  getData(){
      this._http.get('http://localhost:5000/grafica').subscribe( (data:any) => this.lineChartData = data);
  }

  listenSocket(){
    this.wsService.listen('cambio-grafica').subscribe( (data:any) =>{
      console.log('socket', data);
      this.lineChartData = data;
    })
  }

}
