import { TourExecutionSessionStatus } from "./tour-execution-session-status.model";

export interface TourExecutionSession {
    id: number,
    status: TourExecutionSessionStatus,
    tourId: number,
    nextKeyPointId: number,
    lastActivity: Date,
    progress: number
}
