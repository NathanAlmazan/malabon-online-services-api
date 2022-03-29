import prismaClient from "../../config/prismaClient";

export type Role = "citizen" | "super" | "admin";
export type Departement = "OLBO" | "CHO" | "CENRO" | "OCMA" | "BFP" | "PZO" | "TRSY" | "BPLO" | "FENCING" | "ARCHITECTURAL" | "STRUCTURAL" | "ELECTRICAL" | "MECHANICAL" | "SANITARY" | "PLUMBING" | "INTERIOR" | "ELECTRONICS";

const departments: Departement[] = ["OLBO", "CHO", "CENRO", "OCMA", "BFP", "PZO", "TRSY", "BPLO", "FENCING", "ARCHITECTURAL", "STRUCTURAL", "ELECTRICAL", "MECHANICAL", "SANITARY", "PLUMBING", "INTERIOR", "ELECTRONICS"];

class AdminModel {

    checkDepartmentTypes(roles: Departement[], userId: number): { accountId: number, role: Departement }[] {
        let adminRoles: { accountId: number, role: Departement }[] = [];

        roles.forEach(role => {
            if (departments.includes(role)) {
                adminRoles.push({ accountId: userId, role: role });
            }
        });

        return adminRoles;
    }

    async createAdmin(uid: string, roles: Departement[]) {
        const adminAccount = await prismaClient.accounts.update({
            where: {
                uid: uid,
            },
            data: {
                officer: true
            }
        });

        const adminRoles = this.checkDepartmentTypes(roles, adminAccount.userId);

        await prismaClient.roles.createMany({
            data: adminRoles
        });

        return { account: adminAccount, roles: roles };
    }

    async createSuperuser(uid: string) {
        const superuser = await prismaClient.accounts.update({
            where: {
                uid: uid,
            },
            data: {
                superuser: true,
                officer: true
            }
        });

        return superuser;
    }

    async updateAdminRoles(uid: string, roles: Departement[]) {
        const adminAccount = await prismaClient.accounts.findUnique({
            where: {
                uid: uid,
            },
            select: {
                userId: true
            }
        });

        if (!adminAccount) return null;

        await prismaClient.roles.deleteMany({
            where: {
                accountId: adminAccount.userId
            }
        });

        const adminRoles = this.checkDepartmentTypes(roles, adminAccount.userId);

        await prismaClient.roles.createMany({
            data: adminRoles
        });

        return { account: adminAccount, roles: roles };
    }

    async getAdminAccount(uid: string) {
        const adminAccount = await prismaClient.accounts.findUnique({
            where: {
                uid: uid,
            },
            include: {
                roles: true,
            }
        });

        return adminAccount;
    }

    async getAdminAccountByEmail(email: string) {
        const adminAccount = await prismaClient.accounts.findUnique({
            where: {
                email: email
            },
            include: {
                roles: true,
            }
        });

        return adminAccount;
    }

    async getAllAdminAccount() {
        const adminAccount = await prismaClient.accounts.findMany({
            where: {
                officer: true
            },
            include: {
                roles: true,
            }
        });

        return adminAccount;
    }

    async getAdminApprovals(accountId: number) {
        let curr = new Date; 
        let first = curr.getDate() - curr.getDay(); 
        let last = first + 6; 

        const approvals = await prismaClient.businessApproval.findMany({
            where: {
                AND: {
                    officialId: accountId,
                    approvedAt: {
                        lte: new Date(curr.setDate(last))
                    }
                }
            }
        })

        return approvals;
    }

    async removeSuperuser(uid: string) {
        const superuser = await prismaClient.accounts.update({
            where: {
                uid: uid,
            },
            data: {
                superuser: false
            }
        });

        return superuser;
    }

    async removeAdmin(uid: string) {
        const adminAccount = await prismaClient.accounts.update({
            where: {
                uid: uid,
            },
            data: {
                officer: false
            }
        });

        await prismaClient.roles.deleteMany({
            where: {
                accountId: adminAccount.userId
            }
        });

        return adminAccount;
    }

}

export default AdminModel;