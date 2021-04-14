export const MONGOOSE_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const SCHEMA_CONFIG = {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  validateBeforeSave: true
}
