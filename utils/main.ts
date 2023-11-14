
export class Utils {
    constructor() {

    }

    async importFile(fileName) {
        const file = require(`../tests/data/${fileName}.json`);
        return file;
    }
}