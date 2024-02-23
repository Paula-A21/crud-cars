export class CarEntity {   
    constructor(
        public carBrand: string,
        public carModel: string,
        public carYear: number,
        public carColor: string,
        public airConditioner: boolean,
        public manualOrAutomatic: string
    ) {}
}