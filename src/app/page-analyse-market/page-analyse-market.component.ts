import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { SidenavComponent } from '../sidenav/sidenav.component';
import {MatSelectModule} from '@angular/material/select';


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
    {value: 'année', viewValue: 'Par année'},
    {value: 'mois', viewValue: 'Par mois'},
  ];
  
  @ViewChild('chart', {static: false}) private chartContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez déplacer this.createChart() de ngOnInit() à ngAfterViewInit()
  }

  ngAfterViewInit(): void {
    this.createChartChiffreAffaire();
    this.createChartResultatComptable();
    this.createChartImpot();
  }

  private createChartBar(): void {
    const data = [
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
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Créer l'axe X
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.mois))
      .padding(0.1);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
      
    // Créer l'axe Y
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]) // Ajout d'une valeur par défaut si les données sont vides
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Créer les barres du graphique
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(String(d.mois)) || 0) // Ajout d'une valeur par défaut si les données sont vides
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.value))
      .attr('height', d => height - y(d.value));
  }

  private createChartChiffreAffaire(): void {
    const data = [
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
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#chart-chiffre-affaire')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Créer l'axe X
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.mois))
      .padding(0.1);

    // Créer l'axe Y
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]) // Ajout d'une valeur par défaut si les données sont vides
      .range([height, 0]);

    // Créer la ligne
    const line = d3.line<any>() // Définir le type de ligne comme 'any'
      .x(d => x(d.mois) || 0) // Accéder directement à la propriété 'year'
      .y(d => y(d.value)); // Utiliser la propriété 'value'

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // Ajouter l'axe X
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
      
    // Ajouter l'axe Y
    svg.append('g')
      .call(d3.axisLeft(y));
  }
  
  private createChartResultatComptable(): void {
    const data = [
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
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#chart-comptabilite')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Créer l'axe X
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.mois))
      .padding(0.1);

    // Créer l'axe Y
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]) // Ajout d'une valeur par défaut si les données sont vides
      .range([height, 0]);

    // Créer la ligne
    const line = d3.line<any>() // Définir le type de ligne comme 'any'
      .x(d => x(d.mois) || 0) // Accéder directement à la propriété 'year'
      .y(d => y(d.value)); // Utiliser la propriété 'value'

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // Ajouter l'axe X
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
      
    // Ajouter l'axe Y
    svg.append('g')
      .call(d3.axisLeft(y));
  }
  private createChartImpot(): void {
    const data = [
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
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select('#chart-impot')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Créer l'axe X
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.mois))
      .padding(0.1);

    // Créer l'axe Y
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]) // Ajout d'une valeur par défaut si les données sont vides
      .range([height, 0]);

    // Créer la ligne
    const line = d3.line<any>() // Définir le type de ligne comme 'any'
      .x(d => x(d.mois) || 0) // Accéder directement à la propriété 'year'
      .y(d => y(d.value)); // Utiliser la propriété 'value'

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // Ajouter l'axe X
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));
      
    // Ajouter l'axe Y
    svg.append('g')
      .call(d3.axisLeft(y));
  }
}