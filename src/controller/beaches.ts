import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import mongoose from 'mongoose';

@Controller('beaches')
export class BeachesController {
    @Post('')
    public async create(request: Request, response: Response): Promise<void> {
        try {
            const beach = new Beach(request.body);
            const result = await beach.save();
            response.status(201).send(result);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                response.status(422).send({ error: error.message });
            } else {
                response.status(500).send({ error: 'Internal Server Error' });
            }
        }
    }
}