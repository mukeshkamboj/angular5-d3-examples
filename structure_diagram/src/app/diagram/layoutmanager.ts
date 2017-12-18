import { Diagram } from './model/diagram.model';
import { DrawableArea } from './model/drawable.area';

export class LayoutManager {

    public draw(center: Diagram) {
        const mainArea = new DrawableArea(center);
        let width = Math.trunc(mainArea.getWidth());
        let height = Math.trunc(mainArea.getHeight());
        let parentWidth = width > 800 ? 800 : (width + 20);
        let parentHeight = height > 600 ? 600 : (height + 20);
    }

}