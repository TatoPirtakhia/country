import { useNavigate, useParams } from "react-router-dom";
import Arrowback from "../assets/ArrowBack";
import { useEffect, useState } from "react";

function Country(props) {
  const { countries, setShowNav } = props;
  const { country } = useParams();
  const [filteredCountry, setFilteredCountry] = useState([]);
  useEffect(() => {
    const formattedCountry = decodeURIComponent(country.replace(/%20/g, " "));
    const filtered = countries.filter(
      (data) => data.name.common === formattedCountry
    );
    setFilteredCountry(filtered);
    console.log(filtered[0]);
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const goback = () => {
    if (params.hasOwnProperty("continent")) {
      const continent = params.continent;
      navigate(`/home/${continent}`);
    } else {
      navigate(`/home`);
    }

    setShowNav(true);
  };
  return (
    <div className="pt-10 w-full flex flex-col items-center">
      <div className="flex flex-col items-start  w-[90%] gap-2 ">
        <div
          onClick={goback}
          className="flex items-center justify-center w-[104px] h-8 gap-2 shadow-back"
        >
          <div>
            <Arrowback />
          </div>
          <p>Back</p>
        </div>
        <div>
          {filteredCountry.map((data, index) => {
            return (
              <div key={index}>
                <img src={data.flags.png} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Country;
