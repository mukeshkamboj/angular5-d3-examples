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
        if (node.getMetaData().size > 1) {
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

}