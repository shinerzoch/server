class Memory {
    constructor() {
        this.users = new Map();
    }

    findOne(where) {
        this.users.forEach((value) => {
            if (value.includes(where)) {
                console.log('found user');
            }

            else {
                console.log('user not found');
            }
        });

        return this.users.get(where.id);
    }

    create(data) {
        const count = this.users.size + 1;
        return this.users.set(count, data);
    }
}

module.exports = Memory;