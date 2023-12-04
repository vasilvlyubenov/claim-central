export type EightDReport = {
    descriptionId: string;
    containmentActions: string;
    rootCauseAnalysis: string;
    correctiveActions: string;
    correctiveActionDeadline: Date | null;
    verifyCorrectiveActions: string;
    verifyCorrectiveActionsDeadline: Date | null;
    preventiveActions: string;
    preventiveActionDeadline: Date | null;
    teamRecognition: string;
}