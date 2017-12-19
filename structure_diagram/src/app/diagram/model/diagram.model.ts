export class Diagram {
    public name: String;
    public type: String;
    public metaData: Map<String, String>;
    public children: Diagram[] = [];
    public parents: Diagram[] = [];


    public getName(): String {
        return this.name;
    }

    public getType(): String {
        return this.type;
    }

    public getMetaData(): Map<String, String> {
        return this.metaData;
    }

    public getChildren(): Diagram[] {
        return this.children;
    }

    public getParents(): Diagram[] {
        return this.parents;
    }

}