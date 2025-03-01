import {SoftDeleteDocument} from 'mongoose-delete';

export enum Section {
    A = "A", B = "B", C = "C", D = "D", E = "E", F = "F", G = "G", H = "H", I = "I",
    J = "J", K = "K", L = "L", M = "M", N = "N", O = "O", P = "P", Q = "Q", R = "R",
    S = "S", T = "T", U = "U", V = "V", W = "W", X = "X", Y = "Y", Z = "Z"
}

interface Period extends Document {
    period: number;
    subject: string;
    teacherId?: string;
}

export interface IClass extends Document, SoftDeleteDocument {
    name: string;
    section: Section;
    organizationId:string;
    periods: Period[];
    isModified(path: string): boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?:Date;
}