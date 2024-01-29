import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Ajv from "ajv";
import { userSchema } from "../schema/user.schema.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const userData = JSON.parse(req.body.userData);
  console.log(userData);

  //validate
  const ajv = new Ajv();
  const validate = ajv.compile(userSchema);
  const valid = validate(userData);
  if (!valid) {
    console.log("Validation error", validate.errors);
    next(new ApiError(400, validate.errors[0].message));
  }

  const userExist = await User.findOne({
    $or: [{ username: userData.username }, { email: userData.email }],
  });

  if (userExist) {
    next(new ApiError(400, "User already exists"));
  }

  let avatar = "";
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (avatarLocalPath) {
    avatar = await uploadOnCloudinary(avatarLocalPath);
  }
  userData.avatar = avatar ? avatar.url : "";

  const user = await User.create(userData);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    next(new ApiError(400, "Error creating user"));
  }

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    createdUser,
  });
});

export { registerUser };
