import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TrendingStock } from '../../shared/shared.model';






@Component({
  selector: 'app-market-trends',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './market-trends.component.html',
  styleUrl: './market-trends.component.css'
})
export class MarketTrendsComponent {
  displayedColumns: string[] = [
    'rank',
    'ticker',
    'companyName',
    'sector',
    'price',
    'change24h',
    'marketCap',
    'trendDirection',
    'analystSentiment'
  ];
  dataSource = input.required<TrendingStock[]>();
}
