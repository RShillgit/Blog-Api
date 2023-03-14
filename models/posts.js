const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
})

// Formats date to MM/DD/YYYY
PostSchema.methods.formatDate = (timestamp) => {

    // Day
    let day = timestamp.getDate();

    // Month
    let month = timestamp.getMonth() + 1;

    // Year
    let year = timestamp.getFullYear();

    // 2 digit months and days
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = `0${month}`;
    }

    let formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
}

// Export model
module.exports = mongoose.model("Post", PostSchema);