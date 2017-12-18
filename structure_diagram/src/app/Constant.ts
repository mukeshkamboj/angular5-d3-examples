export class Constant {

    public static nodepadding: number = 10;
    public static layerpadding: number = 20;

    public static NODES: Object = {
        "type": "Organisation",
        "name": "Binyamina",
        "metaData": {
            "dob": "Jan 1, 1973"
        },
        "parents": [
            {
                "type": "Organisation",
                "name": "Anat Levi",
                "metaData": {
                    "dob": "Jan 1, 1973"
                },
                "parents": [
                    {
                        "type": "Organisation",
                        "name": "Golan Heights",
                        "metaData": {
                            "dob": "Jan 1, 1973"
                        },
                        "parents": [
                            {
                                "type": "Organisation",
                                "name": "Drs. Versluls",
                                "metaData": {
                                    "dob": "Jan 1, 1973"
                                },
                                "parents": []
                            }
                        ]
                    }
                ]
            },
            {
                "type": "Organisation",
                "name": "Yael Sandler",
                "metaData": {
                    "dob": "Jan 1, 1973"
                },
                "parents": []
            }
        ],
        "children": [
            {
                "type": "Organisation",
                "name": "Domaine Du Castel",
                "metaData": {
                    "dob": "Jan 1, 1973"
                },
                "children": [
                    {
                        "type": "Organisation",
                        "name": "Test Acc",
                        "metaData": {
                            "dob": "Jan 1, 1973"
                        },
                        "children": []
                    },
                    {
                        "type": "Organisation",
                        "name": "Pelter",
                        "metaData": {
                            "dob": "Jan 1, 1973"
                        },
                        "children": []
                    }
                ]
            },
            {
                "type": "Organisation",
                "name": "Golan Heights Syrah",
                "metaData": {
                    "dob": "Jan 1, 1973"
                },
                "children": []
            },
            {
                "type": "Organisation",
                "name": "Pelter Winery",
                "metaData": {
                    "dob": "Jan 1, 1973"
                },
                "children": []
            }
        ]
    };


}