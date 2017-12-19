import { Diagram } from './model/diagram.model';
import { DrawableArea } from './model/drawable.area';
import { Constant } from '../Constant';

export class LayoutManager {

    public static draw(center: Diagram) {
        const mainArea = new DrawableArea(center);
        let width = Math.trunc(mainArea.getWidth());
        let height = Math.trunc(mainArea.getHeight());
        let parentWidth = width > 800 ? 800 : (width + 20);
        let parentHeight = height > 600 ? 600 : (height + 20);
        Constant.svg.attr('height', 960);
        Constant.svg.attr('width', 600);
        mainArea.draw(0, 0)
    }

}