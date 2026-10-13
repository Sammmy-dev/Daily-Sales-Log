import mongoose, { Document } from 'mongoose';
export interface ISale extends Document {
    itemName: string;
    amount: number;
    timestamp: Date;
    createdAt: Date;
}
declare const _default: mongoose.Model<ISale, {}, {}, {}, Document<unknown, {}, ISale, {}, mongoose.DefaultSchemaOptions> & ISale & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISale & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Sale.d.ts.map