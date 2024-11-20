import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = (req, res) => {
  
  //CHECK IF THE USER IS EXISTING
  const q = "SELECT * FROM users WHERE Username=? OR UseremailId=?";
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //ELSE HASH THE PASSWORD AND CREATE THE USER
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const q =
        "INSERT INTO users (`Username`,`UseremailId`,`UserImg`,`UserHomeTown`,`UserPassword`)VALUES (?)";
      const values = [
        req.body.username,
        req.body.email,
        req.body.file,
        req.body.hometown,
        hash,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User registered successfully");
      });
    }
  });
};

export const Login = (req, res) => {
  //CHECK IF THE USER EXISTS
  const q = "SELECT * FROM users WHERE Username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length === 0) res.status(400).json("User not found!!!");
    //CHECK THE PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].UserPassword
    );
    if (!isPasswordCorrect) res.status(400).json("Wrong Username or password");
    const token = jwt.sign({ id: data[0].Userid }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const Logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been successfully logged out");
};
export const getAllusers = (req, res) => {
  const q = "SELECT * FROM users LIMIT 4";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const giveFeedback = (req, res) => {
  const q = "INSERT INTO feedbacks (`Feedback`,`FeedbackUser`) VALUES (?)";
  const values = [req.body.params.feedback, req.body.params.user];
  db.query(q, [values], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Feedback successfully submitted");
  });
};

export const getfeedback = (req, res) => {
  const q =
    "SELECT * FROM feedbacks f JOIN users u ON f.FeedbackUser=u.Userid LIMIT 5;";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const setprofile = (req, res) => {
  const q =
    "UPDATE users SET `UserAbout`=? , `UserUsername`=? WHERE Userid=? LIMIT 1";
  db.query(
    q,
    [
      req.body.params.userabout,
      req.body.params.username,
      req.body.params.userid,
    ],
    (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json("updated successfully");
    }
  );
};
export const getoneuser = (req, res) => {
  const q = "SELECT * FROM users WHERE Userid=?";
  db.query(q, [req.query.userid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
