import { db } from "../db.js";
export const setPost = (req, res) => {
  //   const token = req.cookies.access_token;
  //   if (!token) return res.status(401).json("Not Authenticated!!");
  //   jwt.verify(token, "jwtkey", (err, userInfo) => {
  //     if (err) return res.status(403).json("Token is not valid");
  const q =
    "INSERT INTO posts (`PostTitle`,`PostDesc`,`PostImg`,`Date`,`UserId`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.textvalue,
    req.body.img,
    req.body.date,
    req.body.userid,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created");
  });
  //   });
};
export const getPost = (req, res) => {
  const q = "SELECT * FROM posts WHERE UserId=?";
  db.query(q, [req.query.Userid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getAllPosts = (req, res) => {
  const q = "SELECT * FROM posts p ,users u WHERE p.userid=u.Userid";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addtolikespostsandusers = (req, res) => {
  const q = "INSERT INTO likedpostsandusers (`userid`,`postid`) VALUES (?)";
  const values = [req.body.params.userid, req.body.params.postid];
  db.query(q, [values], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("successfully user and like added");
  });
};
export const removefromslikedpostsandusers = (req, res) => {
  const q = "DELETE FROM likedpostsandusers where postid=? LIMIT 1";
  // const values = [req.query.userid, req.query.postid];
  db.query(q, [req.body.params.postid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("successfully user and like removed");
  });
};
export const addtolikedcities = (req, res) => {
  const q = "SELECT * FROM likedcities WHERE userid=(?) AND cityid=(?)";
  // const value = [req.body.params.userid, req.body.params.postid];
  db.query(q, [req.body.params.userid, req.body.params.cityid], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length === 0) {
      const q =
        "INSERT INTO likedcities (`userid`,`cityid`,`Liked`) VALUES (?)";
      const values = [req.body.params.userid, req.body.params.cityid, 1];
      db.query(q, [values], (err, data) => {
        if (err) res.status(500).json(err);
        return res.status(200).json("successfully data added");
      });
    } else {
      const q =
        "UPDATE likedcities SET Liked=1 WHERE userid=(?) AND cityid=(?)";
      db.query(
        q,
        [req.body.params.userid, req.body.params.cityid],
        (err, data) => {
          if (err) res.status(500).json(err);
          return res.status(200).json("successfully data added");
        }
      );
    }
  });
};
export const addtosavedcities = (req, res) => {
  const q = "SELECT * FROM likedcities WHERE userid=(?) AND cityid=(?)";
  // const value = [req.body.params.userid, req.body.params.postid];
  db.query(q, [req.body.params.userid, req.body.params.cityid], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length === 0) {
      const q =
        "INSERT INTO likedcities (`userid`,`cityid`,`Saved`) VALUES (?)";
      const values = [req.body.params.userid, req.body.params.cityid, 1];
      db.query(q, [values], (err, data) => {
        if (err) res.status(500).json(err);
        return res.status(200).json("successfully data added");
      });
    } else {
      const q =
        "UPDATE likedcities SET Saved=1 WHERE userid=(?) AND cityid=(?)";
      db.query(
        q,
        [req.body.params.userid, req.body.params.cityid],
        (err, data) => {
          if (err) res.status(500).json(err);
          return res.status(200).json("successfully data added");
        }
      );
    }
  });
};
export const deletefromlikedcities = (req, res) => {
  const q = "UPDATE likedcities SET Liked=0 WHERE userid=(?) AND cityid=(?)";
  db.query(q, [req.body.params.userid, req.body.params.cityid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("successfully deleted");
  });
};
export const deletefromsavedcities = (req, res) => {
  const q = "UPDATE likedcities SET Saved=0 WHERE userid=(?) AND cityid=(?)";
  db.query(q, [req.body.params.userid, req.body.params.cityid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("successfully deleted");
  });
};
export const getlikedsavedcitydata = (req, res) => {
  const q = "SELECT * FROM likedcities WHERE userid=(?) AND cityid=(?)";
  db.query(q, [req.query.userid, req.query.cityid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const addlikestoposts = (req, res) => {
  const q = "UPDATE posts SET Likes=Likes+1 WHERE PostId=(?)";
  db.query(q, [req.body.params.postid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Added to likes");
  });
};
export const deletelikesfromposts = (req, res) => {
  const q = "UPDATE posts SET Likes=Likes-1 WHERE PostId=(?)";
  db.query(q, [req.body.params.postid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Removed from likes");
  });
};
export const addsavestoposts = (req, res) => {
  const q = "UPDATE posts SET Saves=Saves+1 WHERE PostId=(?)";
  db.query(q, [req.query.id], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Added to Saves");
  });
};
export const addlikestocities = (req, res) => {
  const q = "UPDATE cities SET Likes=Likes+1 WHERE CityId=(?)";
  db.query(q, [req.query.id], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Added to likes");
  });
};

export const addsavestocities = (req, res) => {
  const q = "UPDATE cities SET Saves=Saves+1 WHERE CityId=(?)";
  db.query(q, [req.query.id], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json("Added to Saves");
  });
};
export const checkliked = (req, res) => {
  const q = "SELECT * FROM likedpostsandusers WHERE userid=?";
  db.query(q, [req.query.userid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
