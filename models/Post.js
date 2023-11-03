 import mongoose from "mongoose";

 const postshema = mongoose.Schema(
    {
       userId: {
        type: String,
        required: true,
       },
       firstName: {
        type: String,
        required: true,
       },
       lastName: {
        type: String,
        required: true,
       },
       location: String,
       descriptioon: String,
       picturePath: String,
       userPicturePath: String,
       likes: {
        type: Map,
        of: Boolean,
       },
       comments: {
        type: Array,
        default: [],
       }
    },{timestamps: true}
 )
 const Post = mongoose.model("Post", postshema);
 export default Post;