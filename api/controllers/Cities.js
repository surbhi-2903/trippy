import { db } from "../db.js";
export const getAllCities = (req, res) => {
  const q = "SELECT * FROM cities WHERE CityCategory=?";
  db.query(q, [req.query.category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getCategory = (req, res) => {
  const q =
    "SELECT * FROM packagecat p JOIN allpackages a ON a.PackageCat=p.CatCategory WHERE PackageId=?";
  const id = req.params.id;
  const idvalue = id.split(":");
  db.query(q, [idvalue[1]], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};
export const getSingleCatPlace = (req, res) => {
  const id = req.params.id;
  const idvalue = id.split(":");
  const q = "SELECT * FROM packagecat WHERE catId=?";
  db.query(q, [idvalue[1]], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};
export const getCity = (req, res) => {
  const q = "SELECT * FROM cities";
  db.query(q, (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};
export const getFavcities = (req, res) => {
  const q =
    "SELECT * FROM  likedcities l JOIN cities c ON l.cityid=c.CityId WHERE userid=(?)";
  db.query(q, [req.query.userid], (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getAllCategory = (req, res) => {
  const q = "SELECT * FROM packagecat";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
