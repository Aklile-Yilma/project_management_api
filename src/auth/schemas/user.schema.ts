import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRole {
    CLIENT = 'Client',
    ADMIN = 'Admin',
    DEVELOPER = 'Developer',
  }

@Schema()
export class User extends Document{
    
    @Prop()
    name: string;

    @Prop({ type: String, enum: Object.values(UserRole), default: UserRole.DEVELOPER })
    role: UserRole;

    @Prop()
    contactInfo: string;

    @Prop({unique: [true, 'Duplicate email entered!']})
    email: string;

    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);