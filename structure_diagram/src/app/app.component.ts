import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Constant } from './Constant';
import { plainToClass } from 'class-transformer';
import { Diagram } from './diagram/model/diagram.model';
import { LayoutManager } from './diagram/layoutmanager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private extraDistance: number = 0;
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private simulation: any;
  private nodeElements: any;
  private textElements: any;
  private linkElements: any;
  private height: number = 600;
  private width: number = 950;
  title = 'app';
  private diagram: Diagram;


  constructor() { }

  ngOnInit() {
    this.diagram = plainToClass(Diagram, Constant.NODES as Object);
    console.log(this.diagram);
    Constant.svg = d3.select('svg');
    let xAxisScale = d3.scaleLinear()
      .domain([0, 1320])
      .range([0, 1320]);
    let yAxisScale = d3.scaleLinear()
      .domain([0, 600])
      .range([600, 0]);

    Constant.svg.call(d3.zoom().on("zoom", function () {
      Constant.svg.attr("transform", d3.event.transform)
    })).attr("transform", "translate(0,0) scale(1)")
      .append("g")
    LayoutManager.draw(this.diagram);
  }

}
