export class RentalsEntity {
    constructor(
        public id: number,
        public rentalDate: Date,
        public returnDate: Date,
        public clientId: number,
        public carId: number
    ) {}

    static fromDatabaseModel(model: any): RentalsEntity {
        return new RentalsEntity(
            model.id,
            model.rentalDate,
            model.returnDate,
            model.clientId,
            model.carId
        );
    }
}