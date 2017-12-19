import { Diagram } from './diagram.model';
import { Constant } from '../../Constant';

export class NodeLayout {

    private x: number = 0;
    private y: number = 0;
    private width: number;
    private height: number;
    private node: Diagram;

    constructor(node: Diagram) {
        this.node = node;
        this.width = 200 + (2 * Constant.nodepadding)
        let metadataSpace = 0;
        console.log(node)
        if (node.metaData.size > 1) {
            metadataSpace = node.getMetaData().size - 1;
        }
        this.height = 45 + (2 * Constant.nodepadding) + (10 * metadataSpace);
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
            .attr('width', 200)
            .attr('height', this.height - (Constant.nodepadding))
            .attr('fill', '#22aa94');
        /*
        context2d.beginPath();
        context2d.rect(exactx + nodepadding, exacty + nodepadding, 200, height - (nodepadding));
        context2d.setFillStyle(boxColor);
        context2d.fill();
        context2d.setLineWidth(1);
        context2d.setStrokeStyle(lineColor);
        context2d.stroke();
        */
        let dataXStart = exactx + Constant.nodepadding;
        let dataYStart = exacty + Constant.nodepadding / 2;
        /*
        String imgRes = null;
        if (RelationEntityType.ORGANISATION.equals(getNode().getEntityType())) {
            imgRes = ApplicationResources.building;
        } else if (RelationEntityType.PERSON.equals(getNode().getEntityType())) {
            imgRes = ApplicationResources.person;
        }
        Image img = new Image(imgRes);
        context2d.drawImage(ImageElement.as(img.getElement()), dataXStart, dataYStart, 64, 64);
        context2d.setFillStyle(textColor);
        context2d.setTextAlign(Context2d.TextAlign.LEFT);
        double textXStart = dataXStart + (nodepadding * 7);
        double textYStart = dataYStart + (nodepadding * 2);
        double textYMargin = (nodepadding * 2);
        context2d.fillText(node.getTitle(), textXStart, textYStart, 140);
        textYStart = textYStart + textYMargin;
        for (Entry < String, String > entry : node.getMetadata().entrySet()) {
            context2d.fillText(entry.getKey() + ": " + entry.getValue(), textXStart, textYStart, 140);
            textYStart = textYStart + textYMargin;
        }
        canvas.getContext2d().closePath();
        */
    }

}