export class ClientsEntity {
    constructor(
        public id: number,
        public clientName: string,
        public clientLastname: string
    ) { }

    static fromDatabaseModel(model: any): ClientsEntity {

        return new ClientsEntity(
            model.id,
            model.clientName,
            model.clientLastname
        );
    }
}