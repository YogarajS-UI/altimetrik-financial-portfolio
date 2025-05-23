import { Component, ElementRef, ViewChild, OnInit, input, Input } from '@angular/core';
import { select, scaleTime, scaleLinear, scaleOrdinal, extent, line, axisBottom, axisLeft, timeParse, timeFormat } from 'd3';
import { performanceChartObj } from '../../shared/shared.model';

type PerformanceData = {
  date: Date;
  [key: string]: number | Date;
};

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [],
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;


  @Input({required:true}) rawData!:performanceChartObj[];
  ngOnInit(): void {
    this.createChart();
    
  }
  

private createChart(): void {
  const element = this.chartContainer.nativeElement;
  const margin = { top: 40, right: 100, bottom: 40, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = select(element)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const parseDate = timeParse('%Y-%m-%d');
  const data:PerformanceData[] = this.rawData.map(d => ({
    date: parseDate(d.date)!,
    portfolio: d.portfolio,
    sp500: d.sp500,
    nasdaq: d.nasdaq
  }));

  const keys = ['portfolio', 'sp500', 'nasdaq'];
  const color = scaleOrdinal<string>()
    .domain(keys)
    .range(['#1f77b4', '#ff7f0e', '#2ca02c']);

  const x = scaleTime()
    .domain(extent(data, d => d.date) as [Date, Date])
    .range([0, width]);

  const y = scaleLinear()
    .domain([
      Math.min(...data.map((d: any) => Math.min(d.portfolio, d.sp500, d.nasdaq))) * 0.95,
      Math.max(...data.map((d: any) => Math.max(d.portfolio, d.sp500, d.nasdaq))) * 1.05
    ])
    .range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(axisBottom(x).ticks(5));

  svg.append('g')
    .call(axisLeft(y));

  const lineGenerator = line<{ date: Date, value: number }>()
    .x(d => x(d.date))
    .y(d => y(d.value));

  // Tooltip setup
  const tooltip = select(element)
    .append('div')
    .attr('class', 'tooltip')  // Use class defined in CSS
    .style('opacity', 0);

  keys.forEach(key => {
    const lineData = data.map(d => ({
      date: d.date,
      value: d[key] as number
    }));

    svg.append('path')
      .datum(lineData)
      .attr('fill', 'none')
      .attr('stroke', color(key)! )
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    svg.selectAll(`.circle-${key}`)
      .data(lineData)
      .enter()
      .append('circle')
      .attr('class', `circle-${key}`)
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', color(key)! )
 
  });

  // Add labels at end of lines
  keys.forEach(key => {
    const last = data[data.length - 1];
    svg.append('text')
      .attr('x', x(last.date) + 5)
      .attr('y', y(last[key] as number))
      .style('fill', color(key)! )
      .style('font-size', '12px')
      .text(key.toUpperCase());
  });
}

}
