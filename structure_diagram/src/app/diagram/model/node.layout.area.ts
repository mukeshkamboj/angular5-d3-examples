import { Diagram } from './diagram.model';
import { Constant } from '../../Constant';
import * as d3 from 'd3';

export class NodeLayout {

    private x: number = 0;
    private y: number = 0;
    private width: number;
    private height: number;
    private node: Diagram;

    private constructor(node: Diagram) {
        this.node = node;
        this.width = 220 + (2 * Constant.nodepadding)
        let metadataSpace = 0;
        if (node.metaData.size > 1) {
            metadataSpace = node.metaData.size - 1;
        }
        this.height = 45 + (2 * Constant.nodepadding) + (10 * metadataSpace);
    }

    public static createNodeLayout(nodeVO: Diagram): NodeLayout {
        return new NodeLayout(nodeVO)
    }

    setX(x: number) {
        this.x = x;
    }

    getX(): number {
        return this.x;
    }

    setY(y: number) {
        this.y = y;
    }

    getY(): number {
        return this.y;
    }

    setWidth(width: number) {
        this.width = width;
    }

    getWidth(): number {
        return this.width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getHeight(): number {
        return this.height;
    }

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getNode(): Diagram {
        return this.node;
    }

    draw(x: number, y: number) {
        let exactx = x + this.x;
        let exacty = y + this.y;

        Constant.svg.append('rect')
            .attr('x', exactx + Constant.nodepadding)
            .attr('y', exacty + Constant.nodepadding)
            .attr('width', 220)
            .attr('height', this.height - (Constant.nodepadding))
            .style('stroke', '#000000')
            .attr('fill', '#2e7c6b');

        let dataXStart = exactx;
        let dataYStart = exacty + Constant.nodepadding / 2;
        let imageUrl = this.node.type === 'Organisation' ? require("./building.png") : require("./person.png");

        Constant.svg.append('svg:image')
            .attr('height', 64)
            .attr('width', 64)
            .attr('x', dataXStart)
            .attr('y', dataYStart)
            .attr('xlink:href', imageUrl)

        Constant.svg.append('text')
            .attr('x', dataXStart + Constant.nodepadding + (Constant.nodepadding * 5))
            .attr('y', dataYStart + Constant.nodepadding * 2 + 1)
            .style('fill', '#DFFFFF')
            .style('font-size', '12px')
            .text(this.node.name)

        let text = '';
        let object = this.node.metaData;
        Object.getOwnPropertyNames(object).forEach(
            function (val, idx, array) {
                text = text + '\n' + val + ' : ' + object[val];
            }
        );
        Constant.svg.append('text')
            .attr('x', dataXStart + Constant.nodepadding + (Constant.nodepadding * 5) + 1)
            .attr('y', dataYStart + Constant.nodepadding * 2 + (Constant.nodepadding * 2))
            .style('fill', '#DFFFFF')
            .style('font-size', '12px')
            .text(text)
    }

}