export class CarsEntity {
    constructor(
        public id: number,
        public carBrand: string,
        public carModel: string,
        public carYear: number,
        public carColor: string,
        public airConditioner: boolean,
        public manualOrAutomatic: string
    ) { }

    static fromDatabaseModel(model: any): CarsEntity {
        return new CarsEntity(
            model.id,
            model.carBrand,
            model.carModel,
            model.carYear,
            model.carColor,
            model.airConditioner,
            model.manualOrAutomatic
        );

    }
}