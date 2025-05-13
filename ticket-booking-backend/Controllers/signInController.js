import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

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
      const correctUserDetails = await userModel.findOne({
        email: userDetails.email,
        password: userDetails.password,
      });
     
      if (correctUserDetails) {
        let payload = {
          user: {
            id: correctUserDetails.id,
          },
        };
        jwt.sign(
          payload,
          "jwtPassword",
          { expiresIn: 360000000 },
          (error, token) => {
            if (error) throw error;
            const userTokenObj = {
              ...correctUserDetails._doc, token
            }
        console.log("correct",userTokenObj);

           res.status(200).json({
              error: {
                errorCode: 200,
                isError: false,
                message: "",
              },
              data: userTokenObj,
            });
          }
        );
             
      } else {
        res.status(400).json({
          error: {
            errorCode: 400,
            isError: true,
            message: "Incorrect password",
          },
          data: null,
        });
      }
    }
  } catch (error) {
    console.log("error while signup", error);
    res.status(500).json({
      error: {
        errorCode: 500,
        isError: true,
        message: `mongodb error in catch ${error}`,
      },
      data: null,
    });
  }
};
export default signInController;
