import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PerformanceChartComponent } from '../../charts/performance-chart/performance-chart.component';
import { performanceChartObj } from '../../shared/shared.model';

@Component({
  selector: 'app-performance-metrics',
  standalone: true,
  imports: [MatCardModule,PerformanceChartComponent],
  templateUrl: './performance-metrics.component.html',
  styleUrl: './performance-metrics.component.css'
})
export class PerformanceMetricsComponent {
data = input.required<performanceChartObj[]>()
}
