import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexPlotOptions, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts"

import { DashboardService } from 'src/app/services/Dashboard/dashboard.service';

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  plotOptions: ApexPlotOptions;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  user_count = 0;
  p_user_count = 0;
  r_contract_count = 0;

  constructor(
    public dashboardService: DashboardService
  ) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "donut"
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 380
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getJoStatusCount();
    this.getUserCount();
    this.getPremiumUserCount();
    this.getRContractCount();
  }

  getUserCount() {
    this.dashboardService.getUserCount().subscribe((data: any) => { 
      this.user_count = data[0].Count;
    });
  }

  getPremiumUserCount() {
    this.dashboardService.getPremiumUserCount().subscribe((data: any) => { 
      this.p_user_count = data[0].Count;
    });
  }

  getRContractCount() {
    this.dashboardService.getRequestContractCount().subscribe((data: any) => { 
      this.r_contract_count = data[0].Count;
    });
  }

  getJoStatusCount() {
    this.dashboardService.getJobOrderStatuses().subscribe((data: any) => {
      this.chartOptions = {
        series: data.series,
        chart: {
          width: 500,
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
              }
            }
          }
        },
        labels: data.labels,
        responsive: [
          {
            breakpoint: 880,
            options: {
              chart: {
                width: 500
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
  }
}
