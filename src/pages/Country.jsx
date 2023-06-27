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
  const languages = (data) => {
    const languageValues = Object.values(data);
    return languageValues;
  };

  return (
    <div className="pt-10 w-full flex flex-col items-center h-[100vh] ">
      <div className="flex flex-col items-start  w-[90%] gap-2 ">
        <div
          onClick={goback}
          className="flex items-center justify-center w-[104px] h-8 gap-2 shadow-back"
        >
          <div>
            <Arrowback />
          </div>
          <p className="text-[#111517] dark:text-white">Back</p>
        </div>
        <div className="mt-[65px] h-full">
          {filteredCountry.map((data, index) => {
            return (
              <div key={index} className="flex flex-col items-start gap-2 h-full">
                <img
                  src={data.flags.png}
                  alt="img"
                  className="rounded-md w-[320px] h-[230px]"
                />
                <h1 className="mt-10 nunito font-[800] text-[22px] text-[#111517] dark:text-white">
                  {data.name.common}
                </h1>
                <p className="text-[#111517] dark:text-white mt-5 nunito font-[800]">{`Native Name`}</p>
                <p className="text-[#111517] dark:text-white nunito font-[800] ">
                  Population:{" "}
                  <span className="font-[600]">
                    {data.population.toLocaleString()}
                  </span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Region: <span className="font-[600]">{data.region}</span>{" "}
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Sub Region:{" "}
                  <span className="font-[600]">{data.subregion}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Capital:<span className="font-[600]">{data.capital}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800] mt-8">
                  Top Level Domain:{" "}
                  <span className="font-[600]">{data.tld[0]}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Currencies:{" "}
                  <span className="font-[600]">{curenci(data.currencies)}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Languages:{" "}
                  <span className="font-[600]">
                    {languages(data.languages).join(", ")}
                  </span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800] mt-8 mb-8">Border Countries:</p>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Country;
