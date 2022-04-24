export default class Discipline {
    id: string;
    name: string;
    description: string;
    length: string;

    constructor(id = '', name = '', description = '', length = '') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.length = length;
    }
}