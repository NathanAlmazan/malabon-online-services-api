import { Accounts } from "@prisma/client";
import prismaClient from "../../config/prismaClient";

export type Gender = "male" | "female";

class AccountModel {

    //create account
    async createAccount(firstName: string, lastName: string, email: string, uid: string, gender?: Gender, middleName?: string, phoneNumber?: string, isActive?: boolean, provider?: string): Promise<Accounts> {
        
        const account = await prismaClient.accounts.create({
            data: {
                uid: uid,
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                provider: provider ? provider : "EmailPassword",
                isActive: isActive 
            }
        })

        return account;
        
    }

    async updateAccount(uid: string, isActive?: boolean, firstName?: string, lastName?: string, middleName?: string, gender?: Gender, email?: string, phoneNumber?: string): Promise<Accounts> {

        const account = await prismaClient.accounts.update({
            where: {
                uid: uid
            },
            data: {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                isActive: isActive
            }
        })

        return account;

    }

    async findAccountByUid(uid: string): Promise<Accounts | null> {
        const account = await prismaClient.accounts.findUnique({
            where: {
                uid: uid,
            }
        })

        return account;
    } 

    async findAccountByEmail(email: string): Promise<Accounts | null> {
        const account = await prismaClient.accounts.findUnique({
            where: {
                email: email,
            }
        })

        return account;
    }

    async deleteAccount(uid: string) {
        const account = await prismaClient.accounts.delete({
            where: {
                uid: uid,
            }
        })

        return account;
    }
}

export default AccountModel;