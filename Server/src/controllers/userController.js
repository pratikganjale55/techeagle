const userModal = require("../modals/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") ;

const createUser = async (req, res) => {
  try {
    const { name, email, address, password , role} = req.body;

    const checkEmail = await userModal.findOne({ email: email });

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
    console.log(passwordRegex.test(password));
    if (!name || !role ) {
      return res.send({ message: "Invalid Credentials" });
    }
    if (!address) {
      return res.send({ message: "enter address" });
    }
    if (checkEmail) {
      return res.send({ message: "user already registered with this email" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        message:
          "Password must contain at least 8 characters, including at least 1 number, 1 lowercase letter, and 1 uppercase letter.",
      });
    }
    if (!emailReg.test(email)) {
      return res
        .status(400)
        .send({ message: "Please provide a valid email address" });
    }

    const salt = await bcrypt.genSaltSync();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new userModal({
      ...req.body,
      password: hashPassword,
    });
    await user.save();

    return res.status(200).send({ message: "successfully signup with email" });
  } catch (error) {
    return res.status(500).send({ message: "error occurred", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validUser = await userModal.findOne({ email });
    if (!email || !password) {
      return res.status(422).send({ message: "fill all the details" });
    }

    if (!validUser) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, validUser.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({
        email : validUser.email ,
        role : validUser.role 
    }, "test123") ;
    res.cookie("usercookieAuth", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });
      console.log("login successful");
      res.status(201).send({
        message: "Login successful",
        userDetails: {
          token,
          userName: validUser.name,
          id: validUser._id,
          role : validUser.role
        },
      });

  } catch (error) {
    return res.status(500).send({ message: "error occurred", error });
  }
};
module.exports = { createUser, loginUser };
