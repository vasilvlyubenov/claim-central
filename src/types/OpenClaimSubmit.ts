
export type OpenClaimSubmit = {
    subject: string
    issueDescription: string,
    file: FileList | null,
    supplierId: string,
    deadlines: {
        d3: string | null,
        d4: string | null,
        d5: string | null,
        d6: string | null,
        d7: string | null,
        d8: string | null,
    }
}