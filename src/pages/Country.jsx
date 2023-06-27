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

  const curenci = (data) => {
    const currencyNames = Object.keys(data).map((key) => {
      const currency = data[key];
      return currency.name;
    });
  
    return currencyNames.join(", ");
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
        <div className="mt-[65px]">
          {filteredCountry.map((data, index) => {
            return (
              <div key={index} className="flex flex-col items-start">
                <img src={data.flags.png} alt="img" className="rounded-md" />
                <h1 className="mt-10 nunito font-[800] text-[22px]">
                  {data.name.common}
                </h1>
                <p>{`Native Name`}</p>
                <p>
                  Population: <span>{data.population.toLocaleString()}</span>
                </p>
                <p>
                  Region: <span>{data.region}</span>{" "}
                </p>
                <p>
                  Sub Region: <span>{data.subregion}</span>
                </p>
                <p>
                  Capital:<span>{data.capital}</span>
                </p>
                <p>
                  Top Level Domain: <span>{data.tld[0]}</span>
                </p>
                <p>
                  Currencies: <span>{curenci(data.currencies)}</span>
                </p>
                <p></p>
                <p></p>
                <p></p>

                <p></p>
                <p></p>
                <p></p>
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Country;
