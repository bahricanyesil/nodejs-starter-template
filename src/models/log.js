import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/*NOTE: You can also choose to store logs in a file instead of DB because of speed problem.
    Both file and DB for storing have some advantages and disadvantages. Actually, there is a trade-off.
    If you consider speed and file size, you can store the logs in a  file.
    However, if you consider the query speed and fast access/read/process when you need, easiness to implement and 
    using logs to have some statistics about app/users, storing in DB is more efficient. */

const logSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  resultCode: { type: String, required: true },
  level: { type: String, required: true },
  errorMessage: { type: String, required: true },
  ip: { type: String, required: true }
},
  {
    timestamps: true
  });


const Log = model('Log', logSchema)
export default Log