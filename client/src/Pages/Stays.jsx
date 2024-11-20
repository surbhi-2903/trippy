import React, { useEffect, useState } from "react";
import axios from "axios";
import StaysSlider from "../Components/StaysComponents/StaysSlider";

const Stays = () => {
  const [beachvalues, setBeachvalues] = useState([]);
  const [hillvalues, setHillvalues] = useState([]);
  const [heritage, setHeritage] = useState([]);
  const [weekend, setWeekend] = useState([]);
  const [pilgrimage, setPilgrimage] = useState([]);
  const [adventure, setAdventure] = useState([]);
  const [lightmood, setLightmood] = useState([]);
  // const []
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/cities/getallcategory"
        );
        const uniqueHeritageSet = new Set(heritage);
        res.data
          .filter((item) => item.CatCategory === "Heritage")
          .forEach((item) => uniqueHeritageSet.add(item));
        const uniqueHeritageArray = [...uniqueHeritageSet];
        setHeritage(uniqueHeritageArray);

        const uniqueBeachSet = new Set(beachvalues);
        res.data
          .filter((item) => item.CatCategory === "Beach")
          .forEach((item) => uniqueBeachSet.add(item));
        const uniqueBeachArray = [...uniqueBeachSet];
        setBeachvalues(uniqueBeachArray);

        const uniqueHillSet = new Set(hillvalues);
        res.data
          .filter((item) => item.CatCategory === "Hill")
          .forEach((item) => uniqueHillSet.add(item));
        const uniqueHillArray = [...uniqueHillSet];
        setHillvalues(uniqueHillArray);

        const uniquePilgrimageSet = new Set(pilgrimage);
        res.data
          .filter((item) => item.CatCategory === "Pilgrimage")
          .forEach((item) => uniquePilgrimageSet.add(item));
        const uniquePilgrimageArray = [...uniquePilgrimageSet];
        setPilgrimage(uniquePilgrimageArray);

        const uniqueWeekendSet = new Set(weekend);
        res.data
          .filter((item) => item.CatCategory === "Weekend")
          .forEach((item) => uniqueWeekendSet.add(item));
        const uniqueWeekendArray = [...uniqueWeekendSet];
        setWeekend(uniqueWeekendArray);

        const uniqueAdventureSet = new Set(pilgrimage);
        res.data
          .filter((item) => item.CatCategory === "Adventure")
          .forEach((item) => uniqueAdventureSet.add(item));
        const uniqueAdvntureArray = [...uniqueAdventureSet];
        setAdventure(uniqueAdvntureArray);

        // res.data.map((item) => {
        // console.log(item.CatCategory, item.CatName);
        // if (item.CatCategory === "Beach")
        //   setBeachvalues([...beachvalues, item]);
        // if (item.CatCategory === "Hill") setHillvalues([...hillvalues, item]);
        // if (item.CatCategory === "Heritage") {
        //   setHeritage([...heritage, item]);
        // }
        // console.log("heriage", heritage);
        // if (item.CatCategory === "Weekend") setWeekend([...weekend, item]);
        // if (item.CatCategory === "Pilgrimage")
        //   setPilgrimage([...pilgrimage, item]);
        // if (item.CatCategory === "Light") setLightmood([...lightmood, item]);
        // });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const arr = [
    {
      id: "1",
      cityName: "Taj Mahal",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        "Located on the banks of Yamuna, Agra is best known for the iconic taj mahal",
      src: "/images/places/Agra.jpg",
    },
    {
      id: "2",
      cityName: "Lotus Temple",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        " The Lotus Temple (also known as Kamal Mandir) in Delhi is a matchless architectural marvel and ",
      src: "/images/places/lotustemple.jpg",
    },
    {
      id: "3",
      cityName: "Victoria Memorial",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        "The Victoria Memorial or Victoria Palace Kolkata is much more than an iconic landmark or a historical building in the city",
      src: "/images/places/victorialmemorial1.jpg",
    },
    {
      id: "4",
      cityName: "Howrah Bridge",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        " The beautiful Rabindra Setu which connects Kolkata to Howrah has today become an icon of Bengal's history, culture",
      src: "/images/places/howrahbridge1.jpg",
    },
  ];
  return (
    <div className="cities">
      <div className="topdestinations">
        <h2>Top Heritage Destinations</h2>
        <div className="recommendedcards">
          <StaysSlider images={heritage} />
        </div>
      </div>
      <div className="topdestinations">
        <h2>Top Beach Destinations</h2>
        <div className="recommendedcards">
          <StaysSlider images={beachvalues} />
        </div>
      </div>
      {/* <div className="topdestinations">
        <h2>Top Destinations for Weekends in India</h2>
        <div className="recommendedcards" style={{ height: "100%" }}>
          <Slider2 images={weekend} />
        </div>
      </div> */}
      <div className="topdestinations">
        <h2> Top Hill Stations</h2>
        <div className="recommendedcards">
          <StaysSlider images={hillvalues} />
        </div>
      </div>
      <div className="topdestinations">
        <h2> Famous Pilgrimage Places</h2>
        <div className="recommendedcards">
          <StaysSlider images={pilgrimage} />
        </div>
      </div>
      <div className="topdestinations">
        <h2> Famous Adventure Places</h2>
        <div className="recommendedcards">
          <StaysSlider images={adventure} />
        </div>
      </div>
      <div className="topdestinations">
        <h2> Famous Weekend Places</h2>
        <div className="recommendedcards">
          <StaysSlider images={weekend} />
        </div>
      </div>
    </div>
  );
};

export default Stays;
