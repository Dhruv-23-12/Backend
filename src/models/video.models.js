import mongoose,{Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const videoSchema = new Schema(
    {
        videoFile : {
            type : String,
            require : true
        },
        thummbnail : {
            type : String,
            require : true
        },
        title : {
            type : String,
            require : true,
        },
        description : {
            type : String,
            require : true,
        },
        duration : {
            type : Number,
            require : true,
        },
        views : {
            type : Number,
            default : 0
        },
        isPublic : {
            type : Boolean,
            default : true
        },
        ower : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }

    },
    {
        timestamps : true
    }
)

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.pasword,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateaccessToken = function(){
     return jwt.sign(
        {
            _id : this._id,
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,

        }
    )
}
userSchema.methods.generateRefeshToken = function(){
     return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )

}

// videoSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("Video",videoSchema)