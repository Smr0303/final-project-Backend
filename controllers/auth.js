const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const client = require("../config/db");

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  client.query(`SELECT * FROM users where email= '${email}';`).then((data) => {
    isValid = data.rows;

    if (isValid.length !== 0) {
      res.status(400).json({
        error: "User alerady exists",
      });
    } else {
      bcrypt
        .hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error",
            });
          }

          const user = {
            name,
            email,
            password: hash,
          };
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );

          client
            .query(
              `INSERT INTO users (name , email, password) VALUES('${user.name}', '${user.email}','${user.password}');`
            )
            .then((data) => {
              res.status(200).json({
                message: " User added sucesfully to database",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Internal server error",
              });
            });
        })
        .catch((err) => {
          res.status(500).json({
            error: "Internal server error",
          });
        });
    }
  });
};

//sign in function

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  client
    .query(`SELECT * FROM users where email='${email}';`)
    .then((data) => {
      const userData = data.rows;
      if (userData.length === 0) {
        console.log("not exist");
        res.status(400).json({
          error: "User does not exist",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "user signed in successfully",
              token: token,
            });
          } else {
            res.status(403).json({
              error: "Incorrect password",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};
