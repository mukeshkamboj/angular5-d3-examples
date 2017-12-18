export class Constant {

    public static NODES: Object = [
        { id: "Parent_1", label: "Parent 1", level: 0 },
        { id: "Parent_2", label: "Parent 2", level: 0 },
        { id: "Parent_3", label: "Parent 3", level: 0 },
        { id: "Grand_Paa_1", label: "Grand Paa 1", level: 1 },
        { id: "Grand_Paa_2", label: "Grand Paa 2", level: 1 },
        { id: "Grand_Paa_3", label: "Grand Paa 3", level: 1 },
        { id: "Grand_Paa_4", label: "Grand Paa 4", level: 1 },
        { id: "Root", label: "Root", level: 1 },
        { id: "Child_1", label: "Child 1", level: 2 },
        { id: "Child_2", label: "Child 2", level: 2 },
        { id: "Child_3", label: "Child 3", level: 4 },
        { id: "Grand_Child_1", label: "Grand Child 1", level: 4 },
        { id: "Grand_Child_2", label: "Grand Child 2", level: 4 },
        { id: "Grand_Child_3", label: "Grand Child 3", level: 3 }
    ];

    public static LINKS: Object = [
        { source: "Parent_1", target: "Grand_Paa_1", value: "1", strength: 0.1 },
        { source: "Parent_2", target: "Grand_Paa_2", value: "1", strength: 0.1 },
        { source: "Parent_3", target: "Grand_Paa_3", value: "1", strength: 0.1 },
        { source: "Parent_3", target: "Grand_Paa_4", value: "1", strength: 0.1 },
        { source: "Root", target: "Parent_1", value: "1", strength: 0.2 },
        { source: "Root", target: "Parent_2", value: "1", strength: 0.2 },
        { source: "Root", target: "Parent_3", value: "1", strength: 0.2 },
        { source: "Child_1", target: "Root", value: "1", strength: 0.3 },
        { source: "Child_2", target: "Root", value: "1", strength: 0.3 },
        { source: "Child_3", target: "Root", value: "1", strength: 0.3 },
        { source: "Grand_Child_1", target: "Child_1", value: "1", strength: 0.4 },
        { source: "Grand_Child_2", target: "Child_2", value: "1", strength: 0.4 },
        { source: "Grand_Child_3", target: "Child_3", value: "1", strength: 0.4 },
    ];
}