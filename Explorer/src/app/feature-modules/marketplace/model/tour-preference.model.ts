export interface TourPreference {
    id?: number;
    userId?: number;
    difficultyLevel: number;
    walkingRating: number;
    cyclingRating: number;
    carRating: number;
    boatRating: number;
    selectedTags: Array<string>;
}