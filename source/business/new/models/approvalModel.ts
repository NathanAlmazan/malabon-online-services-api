import { BusinessAdresses, BusinessApproval, BusinessOwners, BusinessPayments } from "@prisma/client";
import prismaClient from "../../../config/prismaClient";

export type Departement = "OLBO" | "CHO" | "CENRO" | "OCMA" | "BFP" | "PZO" | "TRSY" | "BPLO";

class ApprovalModel {

    async getRegFormsToApprove(roles: Departement[]) {
        const formsForApprovals = await prismaClient.businessRegistry.findMany({
            where: {
                approved: false
            },
            select: {
                businessId: true,
                businessName: true,
                submittedAt: true,
                TIN: true,
                owners: true,
                approvals: true,
                addresses: true,
                trackNumber: true,
                payments: true
            },
            orderBy: {
                submittedAt: 'desc'
            }
        })

        let formsToApprove: {
            businessId: number;
            businessName: string;
            submittedAt: Date;
            addresses: BusinessAdresses[];
            TIN: string;
            owners: BusinessOwners[];
            approvals: BusinessApproval[];
            payments: BusinessPayments[];
        }[] = [];

        formsForApprovals.forEach(form => {
            const approvals = form.approvals.map(approval => approval.approvalType);
            
            let count: number = 0;
            roles.forEach(role => {
                if (role == "TRSY") {
                    if (form.payments.length == 0) count++;
                }
                else if (!approvals.includes(role)) count++;
            })

            if (count > 0) {
                formsToApprove.push(form);
            }
        })


        return formsToApprove;
    }

    async getWeeklyRequest(roles: Departement[]) {
        let curr = new Date; 
        let first = curr.getDate() - curr.getDay(); 
        let last = first + 6; 

        const formsForApprovals = await prismaClient.businessRegistry.findMany({
            where: {
                submittedAt: {
                    gte: new Date(curr.setDate(first)),
                    lte: new Date(curr.setDate(last))
                }
            },
            select: {
                businessId: true,
                businessName: true,
                submittedAt: true,
                TIN: true,
                owners: true,
                approvals: true,
                addresses: true,
                trackNumber: true,
                payments: true
            },
            orderBy: {
                submittedAt: 'desc'
            }
        })

        let formsToApprove: {
            businessId: number;
            businessName: string;
            submittedAt: Date;
            addresses: BusinessAdresses[];
            TIN: string;
            owners: BusinessOwners[];
            approvals: BusinessApproval[];
            payments: BusinessPayments[];
        }[] = [];

        formsForApprovals.forEach(form => {
            const approvals = form.approvals.map(approval => approval.approvalType);
            
            let count: number = 0;
            roles.forEach(role => {
                if (role == "TRSY") {
                    if (form.payments.length == 0) count++;
                }
                else if (!approvals.includes(role)) count++;
            })

            if (count > 0) {
                formsToApprove.push(form);
            }
        })


        return formsToApprove;
    }

    async createApproval(accountId: number, businessId: number, approved: boolean, required: boolean, type: Departement, fee: number, remarks?: string) {
        const approval = await prismaClient.businessApproval.create({
            data: {
                approvalType: type,
                approvalFee: fee,
                approved: approved,
                required: required,
                remarks: remarks,
                officialId: accountId,
                businessId: businessId
            }
        })

        return approval;
    }

    async setTotalTax(businessId: number, tax: number) {
        const businessTax = await prismaClient.businessPayments.create({
            data: {
                businessId: businessId,
                newBusiness: true,
                amount: tax
            }
        })

        return businessTax;
    }

    async saveTaxOrderFile(businessId: number, fileURL?: string) {
        if (fileURL) {
            const taxOrderFile = await prismaClient.files.create({
                data: {
                    documentType: "Tax Order of Payment",
                    fileName:  "Tax Order of Payment",
                    fileURL: fileURL,
                    businessId: businessId
                }
            })
    
            return taxOrderFile;
        }
    }

    async getFormsForTax() {
        const formsForApprovals = await prismaClient.businessRegistry.findMany({
            where: {
                approved: false
            },
            select: {
                businessId: true,
                businessName: true,
                submittedAt: true,
                mobile: true,
                TIN: true,
                owners: true,
                approvals: true
            }
        })

        let approvedForms: {
            TIN: string;
            businessName: string;
            mobile: string;
            submittedAt: Date;
            owners: BusinessOwners[];
            approvals: BusinessApproval[];
            businessId: number;
        }[] = [];

        formsForApprovals.forEach(form => {

            let count: number = 0;
            form.approvals.forEach(approval => {
                if (approval.approved) {
                    count++;
                }
            })

            if (count >= 6) {
                approvedForms.push(form);
            }
        })

        return approvedForms;
    }

    async getApprovedForms() {
        const approvedForms = await prismaClient.businessRegistry.findMany({
            where: {
                approved: true
            },
            select: {
                businessId: true,
                businessName: true,
                submittedAt: true,
                mobile: true,
                TIN: true,
                owners: true,
                approvals: true
            }
        })

        return approvedForms;
    }

    async setFireTrackingNumber(businessId: number, trackingNumber: number) {
        const trackNumber = await prismaClient.businessRegistry.update({
            where: {
                businessId: businessId,
            },
            data: {
                trackNumber: trackingNumber
            }
        });

        return trackNumber;
    }

    async getProgress(userId: number) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 6);

        const approval = await prismaClient.businessApproval.findMany({
            where: {
                officialId: userId,
                approvedAt: {
                    gt: yesterday
                }
            }
        })

        return approval.length;
    }

}

export default ApprovalModel;