import {Component, ElementRef, ViewChild , HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Eth} from "../_Interface/Eth";
import {Chart} from "chart.js/auto";
import {EthvaluesService} from "../_services/eth/ethvalues.service";



@Component({
  selector: 'app-ethchart',
  templateUrl: './ethchart.component.html',
  styleUrls: ['./ethchart.component.scss']
})
export class EthchartComponent {

  eth ?: Eth[];
  @ViewChild("chart") chart !: ElementRef;

  data: any = [];

  constructor(private http: HttpClient , private EthValuesService : EthvaluesService) {
  }

  ngOnInit() {
  this.getEthValues();
  }

  // getting the Eth Values using the service
  getEthValues(){
    this.EthValuesService.getValues().subscribe(
      (data :Eth[])=>{
        this.data = data;

        for(let i = 0; i<data.length ; i++){
          this.data[i].date = this.formatDate(this.data[i].date);
        }
        this.drawChart();
      }
    );
  }

  // Function used to format the retrieved date into dd-mm-yyyy
  formatDate(date: Date):string{

    let newDate: Date  = new Date(date);
    let year :number = newDate.getFullYear();
    let month:number = newDate.getMonth() +1;
    let day :number = newDate.getDate();

    return `${day}-${month}-${year}`;
  }

  // Displaying the chart
  drawChart(){
    const ctx = this.chart.nativeElement.getContext('2d');

    // Create the Chart object using the defined ctx
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map((item: any) => item.date), // Specify the type as 'any'
        datasets: [{
          label: 'ETH Price',
          data: this.data.map((item: any) => parseFloat(item.price)), // Specify the type as 'any'
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 12
              }
            }
          }
        },
        scales: {
          y: {
            stacked: true
          }
        },
        responsive :true,
        maintainAspectRatio: false
      }
    });

  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) {
  //   this.updateChartSize();
  // }
  //
  // updateChartSize() {
  //   if (this.chart) {
  //     this.chart.resize();
  //   }
  // }



}
