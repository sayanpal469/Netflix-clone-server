import User from "../modules/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName)

    // Check if userName and email are provided and not empty
    if (!userName || !email) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required fields.",
      });
    }

    // Check if userName or email already exist
    const existingUserByUsername = await User.findOne({ userName });
    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByUsername || existingUserByEmail) {
      let errorMessage = "";
      if (existingUserByUsername) {
        errorMessage += "User name is already taken. ";
      }
      if (existingUserByEmail) {
        errorMessage += "Email is already registered. ";
      }
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const newUser = new User({
      userName,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    let errorMessage = "";
    if (user) {
      if (user.password !== password) {
        errorMessage += "Invalid credentials";
        return res.status(403).json({
          success: false,
          message: errorMessage,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Login successfull",
          user,
        });
      }
    } else {
      errorMessage += "This email does not exists";
      return res.status(404).json({
        success: false,
        message: errorMessage,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    // console.error(error);
    res.status(400).json(error.message);
  }
};
