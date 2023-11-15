import { TourStatus } from "../../tour-authoring/model/tour.model"
import { TourExecutionSessionStatus } from "./tour-execution-session-status.model"

export interface TourExecutionSessionInfo{
    //Tour info
    name: string,
    difficulty: number,
    tags: string[],
    tourStatus?: TourStatus,
    description: string,
    //Tour execution info
    lastActivity: Date,
    tourExecutionStatus: TourExecutionSessionStatus,
}
