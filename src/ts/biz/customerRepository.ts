import * as collection from './customer'

export class CustomerRepository {
    public fetch = (key: string) : collection.CustomerCollection => {
        return (new collection.CustomerCollection());
    }
}