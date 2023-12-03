export type TEditClaim = {
    claimId: string,
    subject: string,
    issueDescription: string,
    file: FileList | null,
    filePath: string
}