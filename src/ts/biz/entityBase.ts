export interface IIdentity {
    key : string
}

export abstract class EntityBase implements IIdentity {
    private _key: string;

    constructor(key: string) {
        this._key = key;
    }
    
    public get key() {
        return this._key;
    }

    public toString = () : string => {
        return this.key;
    }
}