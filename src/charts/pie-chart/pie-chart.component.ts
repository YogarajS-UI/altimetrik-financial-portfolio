import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  input,
  Input,
} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import * as d3 from 'd3';
import { assetObj } from '../../shared/shared.model';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [MatCardModule, PieChartComponent],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})


export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') private chartContainer!: ElementRef;

@Input({required:true}) data!:assetObj[];

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<any>().value((d: any) => d.value);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute');

    const arcs = svg
      .selectAll('arc')
      .data(pie(this.data))
      .enter()
      .append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: any) => color(i.toString()))
      .on('mouseover', (event: MouseEvent, d: any) => {
        tooltip
          .transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip
          .html(`${d.data.label}: ${d.data.value}`)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })

      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', 0);
      });
  }
}
