import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AssetComponent } from '../asset/asset.component';
import { MarketTrendsComponent } from '../market-trends/market-trends.component';
import { PerformanceMetricsComponent } from '../performance-metrics/performance-metrics.component';
import { SharedService } from '../../shared/shared.service';
import { FinancialMockData } from '../../shared/shared.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,AssetComponent,MarketTrendsComponent,PerformanceMetricsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
mockData!:FinancialMockData;
sharedService = inject(SharedService)

ngOnInit(): void {
  this.sharedService.getMockData().subscribe((res)=>{
    this.mockData = res
  })
}
}
