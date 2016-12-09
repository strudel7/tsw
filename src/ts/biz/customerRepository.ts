import * as collection from './customerCollection'

export class CustomerRepository {
    public fetch = (key: string) : collection.CustomerCollection => {
        return (new collection.CustomerCollection());
    }
}