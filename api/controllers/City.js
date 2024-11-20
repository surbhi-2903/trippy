import { db } from "../db.js";
export const getCityandPlaces = (req, res) => {
  const q =
    "SELECT * FROM cities c JOIN places p ON c.CityId=p.CityId WHERE c.CityId=? ";
  // "SELECT * FROM cities WHERE CityId=?";
  const id = req.params.id;
  const idvalue = id.split(":");
  db.query(q, [idvalue[1]], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getAllPackages = (req, res) => {
  const q = "SELECT * FROM allpackages ";
  db.query(q, (err, data) => {
    if (err) res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getSinglePlace = (req, res) => {
  const q = "SELECT * FROM places WHERE PlacesId=?";
  const id = req.params.id;
  const idvalue = id.split(":");
  db.query(q, [idvalue[1]], (err, data) => {
    if (err) res.status(500).send(err);
    return res.status(200).json(data);
  });
};
