import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Constant } from './Constant';

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

  constructor() { }

  ngOnInit() {
    this.svg = d3.select('svg');
    this.svg.attr('width', this.width).attr('height', this.height)

    // Creating the simulation with 500 -ve strength and force center is center of the svg canvas.
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d['id']))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    //Creating the node in circle shape.
    this.nodeElements = this.svg.append('g')
      .attr("class", "nodes")
      .selectAll('circle')
      .data(Constant.NODES)
      .enter().append('circle')
      .attr('r', 15)
      .attr('fill', '#22aa94')

    // Creating the node titles.
    this.textElements = this.svg.append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(Constant.NODES)
      .enter().append('text')
      .text(node => node.label)
      .attr('font-size', 15)
      .attr('dx', -36)
      .attr('dy', 5)

    // Creating the links among the nodes
    this.linkElements = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(Constant.LINKS)
      .enter().append("line")
      .attr('stroke', '#202529')
      .attr("stroke-width", 1)

    // rendering the nodes, titles and links.
    this.simulation.nodes(Constant.NODES)
      .on('tick', () => {

        // Rendering the links.
        this.linkElements
          .attr('x1', link => { console.log(link); return link.source.x + this.extraDistance })
          .attr('y1', link => link.source.y + this.extraDistance)
          .attr('x2', link => link.target.x + this.extraDistance)
          .attr('y2', link => link.target.y + this.extraDistance)

        //Rendering the nodes.
        this.nodeElements
          .attr("cx", node => node.x)
          .attr("cy", node => node.y)

        //Rendering the title.
        this.textElements
          .attr("x", node => node.x)
          .attr("y", node => node.y)

      })

    // Provind the links data to force simulations.
    this.simulation.force('link').links(Constant.LINKS)
  }

}
