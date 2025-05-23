import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';
import { assetObj } from '../../shared/shared.model';

@Component({
  selector: 'app-asset',
  standalone: true,
  imports: [MatCardModule,PieChartComponent],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css'
})
export class AssetComponent {
   data = input.required<assetObj[]>()
}
