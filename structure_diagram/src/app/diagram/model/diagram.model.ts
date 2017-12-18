export class Diagram {
    private name: String;
    private type: String;
    private metaData: Map<String, String>;
    private children: Diagram[];
    private parents: Diagram[];


    getName(): String {
        return this.name;
    }

    getType(): String {
        return this.type;
    }

    getMetaData(): Map<String, String> {
        return this.metaData;
    }

    getChildren(): Diagram[] {
        return this.children;
    }

    getParents(): Diagram[] {
        return this.parents;
    }

}