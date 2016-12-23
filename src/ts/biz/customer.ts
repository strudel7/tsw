import * as base from './entityBase'

export class Customer extends base.EntityBase {
    constructor(key: string) {
        super(key);
    }
}

export class CustomerCollection {
    private _entitesByKey = {};
    private _entitesByIndex = {};

    constructor(entities?: Array<base.EntityBase>) {
        if (!entities) {
            return;
        }

        for(let i = 0; (i < entities.length); i++) {
            let val: base.EntityBase = entities[i];
            this._entitesByKey[val.key] = val;
            this._entitesByIndex[i] = val;
        }
    }

    public getByKey = (key: string) : Customer => {
        return this._entitesByKey[key];
    }

    public getByIndex = (index: number) : Customer => {
        return this._entitesByIndex[index];
    }
}