export class WorkoutDetails {
    constructor(
        public _id: number,
        public activity: string,
        public duration: number,
        public category: string,
        public type: string,
        public intensity: number
    ) {}   
}