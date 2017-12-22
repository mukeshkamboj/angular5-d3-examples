import { Diagram } from './model/diagram.model';
import { DrawableArea } from './model/drawable.area';
import { Constant } from '../Constant';

export class LayoutManager {

    public static draw(center: Diagram) {
        const mainArea = new DrawableArea(center);
        let width = Math.trunc(mainArea.getWidth());
        let height = Math.trunc(mainArea.getHeight());
        Constant.svg
            .attr('height', height)
            .attr('width', width)
        mainArea.draw(0, 0)
    }

}