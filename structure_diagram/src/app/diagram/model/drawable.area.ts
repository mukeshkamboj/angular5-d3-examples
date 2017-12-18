import { NodeLayout } from './node.layout.area';
import { Diagram } from './diagram.model';
import { Constant } from '../../Constant';

export class DrawableArea {

    private x: number = 0;
    private y: number = 0;
    private width: number;
    private height: number;
    private rightside_positioning: number = 0;
    private leftside_positioning: number = 0;
    private centerNode: NodeLayout;
    private childAreas: DrawableArea[] = [];
    private parentAreas: DrawableArea[] = [];

    constructor(nodeVO: Diagram) {
        this.centerNode = new NodeLayout(nodeVO);
        this.width = this.centerNode.getWidth();
        this.height = this.centerNode.getHeight();

        nodeVO.getChildren().forEach(element => {
            this.childAreas.push(new DrawableArea(element));
        });

        nodeVO.getParents().forEach(element => {
            this.parentAreas.push(new DrawableArea(element));
        });

        if (this.childAreas.length == 1) {
            const onlyChild = this.childAreas[0];
            this.positionSingleArea(onlyChild, false);
        } else if (this.childAreas.length > 1) {
            this.leftside_positioning = this.centerNode.getX() + (this.centerNode.getWidth() / 2);
            this.rightside_positioning = this.leftside_positioning;

            // position each childarea in the area depending it has children shift left or right
            // move downwards upwards to prevent line crossings
            let orphans: DrawableArea[] = [];
            let families: DrawableArea[] = [];

            this.childAreas.forEach(child => {
                if (child.hasChildren()) {
                    families.push(child);
                } else {
                    orphans.push(child);
                }
            })
            this.positionOrphanAreas(orphans, false);
            this.positionFamilyAreas(families, false);
        }

    }

    positionOrphanAreas(areas: DrawableArea[], up: boolean) {
        let leftColumn = false;

        let increment_leftside = 0;
        let decrement_rightside = 0;

        let rowidx = -1;
        for (let i = 0; i < areas.length; i++) {
            if (i % 2 == 0) {
                rowidx = rowidx + 1;
            }
            let area = areas[i];
            // determine y pos
            let newy = 0;
            if (!up) {
                newy = this.centerNode.getY() + this.centerNode.getHeight()
                    + Constant.layerpadding + (this.centerNode.getHeight() * rowidx);
                // increase height as needed
                if (newy + area.getHeight() > this.height) {
                    this.incrementHeigth(newy + area.getHeight() - this.height, false);
                }
            } else {
                newy = this.centerNode.getY() - Constant.layerpadding - (this.centerNode.getHeight() * rowidx) - area.getHeight();
                // increase height as needed
                if (newy < 0) {
                    this.incrementHeigth(-newy, true);
                    newy = 0;
                }
            }

            if (!leftColumn) {
                // check on fit
                if (this.leftside_positioning + area.getWidth() > this.width) {
                    this.incrementWidth(this.leftside_positioning + area.getWidth() - this.width, false);
                }
                area.setPosition(this.leftside_positioning, newy);
                if (area.getWidth() > increment_leftside) {
                    increment_leftside = area.getWidth();
                }
            } else {
                let newx = this.rightside_positioning - area.getWidth();
                if (newx < 0) {
                    this.incrementWidth(-newx, true);
                    newx = 0;
                }
                area.setPosition(newx, newy);
                if (area.getWidth() > decrement_rightside) {
                    decrement_rightside = area.getWidth();
                }
            }

            leftColumn = !leftColumn;
        }

        this.leftside_positioning = this.leftside_positioning + increment_leftside;
        this.rightside_positioning = this.rightside_positioning - decrement_rightside;
    }

    positionFamilyAreas(areas: DrawableArea[], up: boolean) {
        let leftColumn = false;
        for (let i = 0; i < areas.length; i++) {
            let family = areas[i];
            let newy = 0;
            if (!up) {
                newy = this.centerNode.getY() + this.centerNode.getHeight() + Constant.layerpadding;
                if (newy + family.getHeight() > this.height) {
                    this.incrementHeigth(newy + family.getHeight() - this.height, up);
                }
            } else {
                newy = this.centerNode.getY() - Constant.layerpadding - family.getHeight();
                if (newy < 0) {
                    this.incrementHeigth(0 - newy, true);
                    newy = 0;
                }
            }

            if (!leftColumn) {
                // check on fit
                if (this.leftside_positioning + family.getWidth() > this.width) {
                    this.incrementWidth(this.leftside_positioning + family.getWidth() - this.width, false);
                }
                family.setPosition(this.leftside_positioning, newy);
                this.leftside_positioning = this.leftside_positioning + family.getWidth();
            } else {
                let newx = this.rightside_positioning - family.getWidth();
                if (newx < 0) {
                    this.incrementWidth(-newx, true);
                    newx = 0;
                }
                family.setPosition(newx, newy);
                this.rightside_positioning = this.rightside_positioning - family.getWidth();
            }

            leftColumn = !leftColumn;
        }
    }

    hasChildren(): Boolean {
        return this.centerNode.getNode().getChildren().length != 0;
    }

    public positionSingleArea(area: DrawableArea, up: boolean) {
        let centerx = this.centerNode.getX() + (this.centerNode.getWidth() / 2);
        let areacenterx = area.centerNode.getX() + (area.centerNode.getWidth() / 2);

        let newx = centerx - areacenterx;
        if (newx < 0) {
            this.incrementWidth(0 - newx, true);
            newx = 0;
        }
        if (area.getWidth() > this.width) {
            this.incrementWidth(area.getWidth() - this.width, false);
        }

        let newy = 0;
        if (!up) {
            newy = this.centerNode.getY() + this.centerNode.getHeight() + Constant.layerpadding;
            let increment = newy + area.getHeight() - this.height;
            if (increment > 0) {
                this.incrementHeigth(increment, up);
            }
        } else {
            newy = this.centerNode.getY() - (Constant.layerpadding + area.getHeight());
            if (newy < 0) {
                this.incrementHeigth(0 - newy, up);
                newy = 0;
            }
        }

        area.setPosition(newx, newy);
    }

    incrementWidth(increment: number, left: boolean) {
        // shift node and each drawable area relative position
        if (left) {
            this.centerNode.setPosition(this.centerNode.getX() + increment, this.centerNode.getY());
            this.childAreas.forEach(child => {
                child.setPosition(child.getX() + increment, child.getY());
            })

            this.parentAreas.forEach(parent => {
                parent.setPosition(parent.getX() + increment, parent.getY());
            })

            this.leftside_positioning = this.leftside_positioning + increment;
            this.rightside_positioning = this.rightside_positioning + increment;
        }
        this.width = this.width + increment;
    }

    incrementHeigth(increment: number, up: boolean) {
        if (up) {
            this.centerNode.setPosition(this.centerNode.getX(), this.centerNode.getY() + increment);

            this.childAreas.forEach(child => {
                child.setPosition(child.getX(), increment + child.getY());
            })

            this.parentAreas.forEach(parent => {
                parent.setPosition(parent.getX(), increment + parent.getY());
            })
        }
        this.height = this.height + increment;
    }

    draw(x: number, y: number) {
        let exactx = this.x + this.x;
        let exacty = this.y + this.y;
        this.centerNode.draw(exactx, exacty);
        this.drawConnections(exactx, exacty);
        this.childAreas.forEach(child => {
            child.draw(exactx, exacty);
        })

        this.parentAreas.forEach(parent => {
            parent.draw(exactx, exacty);
        })

    }

    hasParents(): Boolean {
        return this.centerNode.getNode().getParents().length != 0;
    }

    drawConnections(x: number, y: number) {
        if (this.parentAreas.length == 1) {
            // draw connecting line
            let exactx = x + this.centerNode.getX() + this.centerNode.getWidth() / 2;
            let exacty1 = y + this.centerNode.getY() + Constant.nodepadding;
            let area = this.parentAreas[0];
            let exacty2 = y + area.getY() + area.centerNode.getY() + area.centerNode.getHeight() - Constant.nodepadding;
            this.drawLine(exactx, exacty1, exactx, exacty2);
        } else if (this.parentAreas.length > 1) {
            let exactx = x + this.centerNode.getX() + this.centerNode.getWidth() / 2;
            let exacty1 = y + this.centerNode.getY() + Constant.nodepadding;
            // first part of line to crosspoint
            //                DrawableArea area = parentAreas.get(0);
            let exacty2 = exacty1 - Constant.layerpadding;
            this.drawLine(exactx, exacty1, exactx, exacty2);

            let orphans: DrawableArea[] = [];
            let families: DrawableArea[] = [];

            this.parentAreas.forEach(parent => {
                if (parent.hasParents()) {
                    families.push(parent)
                } else {
                    orphans.push(parent);
                }
            })

            families.forEach(area => {
                // draw to lines one from the connection point to the center of the area centernode
                // and the other one from that point to the
                let familyx = x + area.getX() + area.centerNode.getX() + (area.centerNode.getWidth() / 2);
                let familyy = y + area.getY() + area.centerNode.getY() + area.centerNode.getHeight() - Constant.nodepadding;
                this.drawLine(exactx, exacty2, familyx, exacty2);
                this.drawLine(familyx, exacty2, familyx, familyy);
            })
            // for each to the family areas we have to draw to lines from the crossing point
            // also for the first layer of orphans
            for (DrawableArea area : families) {
                // draw to lines one from the connection point to the center of the area centernode
                // and the other one from that point to the
                double familyx = x + area.getX() + area.centerNode.getX() + (area.centerNode.getWidth() / 2);
                double familyy = y + area.getY() + area.centerNode.getY() + area.centerNode.getHeight() - nodepadding;
                drawLine(exactx, exacty2, familyx, exacty2);
                drawLine(familyx, exacty2, familyx, familyy);
            }

            int count = 0, row = 0;
            double connectionx = exactx, connectiony = exacty2;
            for (DrawableArea area : orphans) {
                if ((count % 2) == 0) {
                    row++;
                    // draw line from connection point to new connection point for each new row
                    if (row > 1) {
                        double newcy = y + area.getY() + area.centerNode.getY() + (area.centerNode.getHeight() / 2);
                        drawLine(connectionx, connectiony, connectionx, newcy);
                        connectiony = newcy;
                    }
                }

                // draw line for first row similar to families
                if (row == 1) {
                    double familyx = x + area.getX() + area.centerNode.getX() + (area.centerNode.getWidth() / 2);
                    double familyy = y + area.getY() + area.centerNode.getY() + area.centerNode.getHeight() - nodepadding;
                    drawLine(exactx, exacty2, familyx, exacty2);
                    drawLine(familyx, exacty2, familyx, familyy);
                } else {
                    // draw line from new connection point to area
                    if (x + area.getX() + area.centerNode.getX() >= connectionx) {
                        drawLine(connectionx, connectiony, x + area.getX() + area.centerNode.getX() + nodepadding, connectiony);
                    } else {
                        drawLine(connectionx, connectiony, x + area.getX() + area.centerNode.getX() + area.centerNode.getWidth() - nodepadding, connectiony);
                    }
                }
                count++;
            }
        }
        if (childAreas.size() == 1) {
            // draw connecting line
            double exactx = x + centerNode.getX() + centerNode.getWidth() / 2;
            double exacty1 = y + centerNode.getY() + centerNode.getHeight() - nodepadding;
            DrawableArea area = childAreas.get(0);
            double exacty2 = y + area.getY() + area.centerNode.getY() + nodepadding;
            drawLine(exactx, exacty1, exactx, exacty2);
        } else if (childAreas.size() > 1) {
            double exactx = x + centerNode.getX() + centerNode.getWidth() / 2;
            double exacty1 = y + centerNode.getY() + centerNode.getHeight() - nodepadding;
            // first part of line to crosspoint
            //                DrawableArea area = parentAreas.get(0);
            double exacty2 = exacty1 + layerpadding;
            drawLine(exactx, exacty1, exactx, exacty2);

            List < DrawableArea > orphans = new ArrayList<>();
            List < DrawableArea > families = new ArrayList<>();
            for (DrawableArea area : childAreas) {
                if (area.hasChildren()) {
                    families.add(area);
                } else {
                    orphans.add(area);
                }
            }

            // for each to the family areas we have to draw to lines from the crossing point
            // also for the first layer of orphans
            for (DrawableArea area : families) {
                // draw to lines one from the connection point to the center of the area centernode
                // and the other one from that point to the
                double familyx = x + area.getX() + area.centerNode.getX() + (area.centerNode.getWidth() / 2);
                double familyy = y + area.getY() + area.centerNode.getY() + nodepadding;
                drawLine(exactx, exacty2, familyx, exacty2);
                drawLine(familyx, exacty2, familyx, familyy);
            }

            int count = 0, row = 0;
            double connectionx = exactx, connectiony = exacty2;
            for (DrawableArea area : orphans) {
                if ((count % 2) == 0) {
                    row++;
                    // draw line from connection point to new connection point for each new row
                    if (row > 1) {
                        double newcy = y + area.getY() + area.centerNode.getY() + (area.centerNode.getHeight() / 2);
                        drawLine(connectionx, connectiony, connectionx, newcy);
                        connectiony = newcy;
                    }
                }

                // draw line for first row similar to families
                if (row == 1) {
                    double familyx = x + area.getX() + area.centerNode.getX() + (area.centerNode.getWidth() / 2);
                    double familyy = y + area.getY() + area.centerNode.getY() + nodepadding;
                    drawLine(exactx, exacty2, familyx, exacty2);
                    drawLine(familyx, exacty2, familyx, familyy);
                } else {
                    // draw line from new connection point to area
                    if (x + area.getX() + area.centerNode.getX() >= connectionx) {
                        drawLine(connectionx, connectiony, x + area.getX() + area.centerNode.getX() + nodepadding, connectiony);
                    } else {
                        drawLine(connectionx, connectiony, x + area.getX() + area.centerNode.getX() + area.centerNode.getWidth() - nodepadding, connectiony);
                    }
                }
                count++;
            }
        }
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

}