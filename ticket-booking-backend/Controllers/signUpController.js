import userModel from "../Models/userModel.js";

const signUpController = async (req, res) => {
  try {
    const body = req.body;
    console.log("body", body);
    const userFound = await userModel.find({email: body.email});
    if (userFound.length == 0) {
      const newUser = new userModel({
        userName: body?.userName || "",
        email: body.email,
        password: body.password,
      });
      await newUser
        .save()
        .then((user) => {
          console.log("User created successfully", user);
          res.status(200).json({
            error: {
              isError: false,
              errorCode: null,
              message: "",
            },
            data: "",
          });
        })
        .catch((error) => {
          console.log("User not created, please try again", error);
          res.status(400).json({
            error: {
              isError: true,
              errorCode: 400,
              message: "Your account not created, please try again...",
            },
            data: "",
          });
        });
    } else {
      res.status(500).json({
        error: {
          isError: true,
          errorCode: 500,
          message: "Your account already created, please signIn...",
        },
        data: "",
      });
    }
  } catch (error) {
    console.log("Catch block signup", error);
        res.status(500).json({
          error: {
            errorCode: 500,
            isError: true,
            message: `mongodb error  signup catch ${error}`,
          },
          data: null,
        });
  }
};
export default signUpController;
