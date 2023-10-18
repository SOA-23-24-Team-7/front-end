export interface TourPreference {
    userId: number;
    difficultyLevel: number;
    walkingRating: number;
    cyclingRating: number;
    carRating: number;
    boatRating: number;
    selectedTags: Array<string>;
}