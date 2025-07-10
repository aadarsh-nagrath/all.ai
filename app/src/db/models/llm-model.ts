import mongoose, { Document, Schema } from 'mongoose';

export interface ILlmModel extends Document {
  model_name: string;
  provider: Array<{
    name: string;
    region: string;
    context_length: number | string;
    latency: string;
    throughput: string;
  }>;
  status: string;
  parameters: string;
  context_length: string;
  max_output_length: string;
  last_updated: Date;
  tag: string;
  Performance: string;
  Response_Time: string;
  Cost: string;
  Success_Rate: string;
  short_description: string;
  long_description: string;
  usecase: string[];
  key_features: string[];
  precision: string;
  benchmarks: string[];
  model_weights_available: boolean;
  api_compatibility: string;
  model_icon: string;
}

const LlmModelSchema: Schema = new Schema({
  model_name: { type: String, required: true },
  provider: [
    {
      name: String,
      region: String,
      context_length: Schema.Types.Mixed,
      latency: String,
      throughput: String,
    },
  ],
  status: String,
  parameters: String,
  context_length: String,
  max_output_length: String,
  last_updated: Date,
  tag: String,
  Performance: String,
  Response_Time: String,
  Cost: String,
  Success_Rate: String,
  short_description: String,
  long_description: String,
  usecase: [String],
  key_features: [String],
  precision: String,
  benchmarks: [String],
  model_weights_available: Boolean,
  api_compatibility: String,
  model_icon: String,
});

export default mongoose.models.LlmModel || mongoose.model<ILlmModel>('LlmModel', LlmModelSchema, 'llm-models'); 