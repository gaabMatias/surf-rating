
import mongoose, { Document, Model } from 'mongoose';

export enum BeachPosition {
    S = 'S',
    E = 'E',
    W = 'W',
    N = 'N',
}

export interface Beach {
    _id?: string;
    name: string;
    position: BeachPosition;
    latitude: number;
    longitude: number;
}

const schema = new mongoose.Schema(
    {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        name: { type: String, required: true },
        position: { type: String, required: true },
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

interface BeachModel extends Omit<Beach, '_id'>, Document { }
export const Beach: Model<BeachModel> | any = mongoose.model('beaches', schema)