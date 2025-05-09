import userModel from "../Models/userModel.js";

const signInController = async (req, res) => {
  try {
    const userDetails = req.body;
    console.log("userDetails", userDetails);
    const userFound = await userModel.find({ email: userDetails.email });
    console.log("userFound", userFound);
    if (userFound.length == 0) {
      res.status(404).json({
        error: {
          errorCode: 404,
          isError: true,
          message: "User not found, Please create account ",
        },
        data: null,
      });
    } else {
      const correctUserDetails = await userModel.find({
        email: userDetails.email,
        password: userDetails.password,
      });
      if (correctUserDetails.length > 0) {
        res.status(200).json({
          error: {
            errorCode: 200,
            isError: false,
            message: "",
          },
          data: correctUserDetails,
        });
      } else {
        res.status(404).json({
          error: {
            errorCode: 404,
            isError: true,
            message: "Incorrect password",
          },
          data: null,
        });
      }
    }
  } catch (error) {
    console.log("error while signup", error);
  }
};
export default signInController;
