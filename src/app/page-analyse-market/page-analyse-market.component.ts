import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatSelectModule } from '@angular/material/select';

interface Periode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-page-analyse-market',
  standalone: true,
  imports: [
    SidenavComponent,
    MatSelectModule
  ],
  templateUrl: './page-analyse-market.component.html',
  styleUrls: ['./page-analyse-market.component.css']
})

export class PageAnalyseMarketComponent implements OnInit, AfterViewInit {
  
  periodes: Periode[] = [
    { value: 'année', viewValue: 'Par année' },
    { value: 'mois', viewValue: 'Par mois' },
  ];

  @ViewChild('chart', { static: false }) private chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createLineChart('chart-chiffre-affaire', [
      { mois: 'Janvier', value: 10 },
      { mois: 'Février', value: 20 },
      { mois: 'Mars', value: 15 },
      { mois: 'Avril', value: 25 },
      { mois: 'Mai', value: 30 },
      { mois: 'Juin', value: 30 },
      { mois: 'Juillet', value: 30 },
      { mois: 'Août', value: 30 },
      { mois: 'Septembre', value: 30 },
      { mois: 'Octobre', value: 30 },
      { mois: 'Novembre', value: 30 },
      { mois: 'Décembre', value: 30 }
    ]);

    this.createLineChart('chart-comptabilite', [
      { mois: 'Janvier', value: 10 },
      { mois: 'Février', value: 20 },
      { mois: 'Mars', value: 15 },
      { mois: 'Avril', value: 25 },
      { mois: 'Mai', value: 30 },
      { mois: 'Juin', value: 30 },
      { mois: 'Juillet', value: 30 },
      { mois: 'Août', value: 30 },
      { mois: 'Septembre', value: 30 },
      { mois: 'Octobre', value: 30 },
      { mois: 'Novembre', value: 30 },
      { mois: 'Décembre', value: 30 }
    ]);

    this.createLineChart('chart-impot', [
      { mois: 'Janvier', value: 10 },
      { mois: 'Février', value: 20 },
      { mois: 'Mars', value: 15 },
      { mois: 'Avril', value: 25 },
      { mois: 'Mai', value: 30 },
      { mois: 'Juin', value: 30 },
      { mois: 'Juillet', value: 30 },
      { mois: 'Août', value: 30 },
      { mois: 'Septembre', value: 30 },
      { mois: 'Octobre', value: 30 },
      { mois: 'Novembre', value: 30 },
      { mois: 'Décembre', value: 30 }
    ]);
  }

  private createLineChart(containerId: string, data: { mois: string; value: number }[]): void {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#' + containerId)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.mois))
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([height, 0]);

    const line = d3.line<any>()
      .x(d => x(d.mois) || 0)
      .y(d => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('rect')
      .attr('width', 60)
      .attr('height', 20)
      .attr('fill', '#f9f9f9')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1');

    tooltip.append('text')
      .attr('x', 30)
      .attr('dy', '1.2em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .attr('fill', 'black');

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.mois) || 0)
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, { mois, value: dValue }) => {
        if (mois && typeof mois === 'string') {
          const xValue = x(mois);
          if (xValue !== undefined) {
            tooltip.style('display', null)
              .attr('transform', `translate(${xValue + margin.left}, ${y(dValue) - 30})`);
            tooltip.select('text').text(`${mois}: ${dValue}`);
          }
        }
      })     
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
}
