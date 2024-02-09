import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/auth/schemas/user.schema";


@Schema()
export class Project  {

    @Prop()
    name: string;

    @Prop()
    clientName: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    progress: number;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    developers: User[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);