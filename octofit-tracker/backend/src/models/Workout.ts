import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  duration: number; // minutes
  calories: number;
  date: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
