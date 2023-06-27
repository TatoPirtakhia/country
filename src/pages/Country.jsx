import { useNavigate, useParams } from "react-router-dom";
import Arrowback from "../assets/ArrowBack";
import { useEffect, useState } from "react";

function Country(props) {
  const {setInput, dark, countries, setShowNav } = props;
  const { country } = useParams();
  const [filteredCountry, setFilteredCountry] = useState([]);

  useEffect(() => {
    const formattedCountry = decodeURIComponent(country.replace(/%20/g, " "));
    const filtered = countries.filter(
      (data) => data.name.common === formattedCountry
    );
    setFilteredCountry(filtered);
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
    setInput('')
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

  const nativeNames = (data) => {
    return Object.values(data)
      .map((name) => name.common)
      .join(", ");
  };

  const borderNames = (code) => {
    const filtered = countries.filter((data) => data.cca3 === code);
    return filtered.length > 0 ? filtered[0].name.common : code;
  };
  

  return (
    <div className="pt-10 w-full flex flex-col items-center  dark:bg-[#202C36] pb-8 ">
      <div className="flex flex-col items-start  w-[90%] gap-2 dark:bg-[#202C36] ">
        <div
          onClick={goback}
          className="flex items-center justify-center w-[104px] h-8 gap-2 shadow-back"
        >
          <div>
            <Arrowback dark={dark} />
          </div>
          <p className="text-[#111517] dark:text-white">Back</p>
        </div>
        <div className="mt-[65px] w-full">
          {filteredCountry.map((data, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start gap-2 h-full  xl:flex-row xl:items-center w-full"
              >
                <img
                  src={data.flags.png}
                  alt="img"
                  className="rounded-md w-[320px] h-[230px] xl:w-[560px] xl:h-[401px] mr-[120px]"
                />
                <div className="flex flex-col ">
                <h1 className="mt-10 nunito font-[800] text-[22px] text-[#111517] dark:text-white">
                  {data.name.common}
                </h1>
                <div className="xl:flex xl:gap-[90px]">
                <div className="xl:flex xl:flex-col xl:gap-2">
                <p className="text-[#111517] dark:text-white mt-5 nunito font-[800]">
                  Native Name:
                  <span className=" font-[300]">
                    {nativeNames(data.name.nativeName)}
                  </span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800] ">
                  Population:{" "}
                  <span className="font-[300]">
                    {data.population.toLocaleString()}
                  </span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Region: <span className="font-[300]">{data.region}</span>{" "}
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Sub Region:{" "}
                  <span className="font-[300]">{data.subregion}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Capital:<span className="font-[300]">{data.capital}</span>
                </p>
                </div>
                <div className="xl:flex xl:flex-col xl:gap-2">
                <p className="text-[#111517] dark:text-white nunito font-[800] mt-8">
                  Top Level Domain:{" "}
                  <span className="font-[300]">{data.tld[0]}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Currencies:{" "}
                  <span className="font-[300]">{curenci(data.currencies)}</span>
                </p>
                <p className="text-[#111517] dark:text-white nunito font-[800]">
                  Languages:{" "}
                  <span className="font-[300]">
                    {languages(data.languages).join(", ")}
                  </span>
                </p>
                </div>
                </div>
                <p className="text-[#111517] dark:text-white nunito font-[800] mt-8 mb-3">
                  Border Countries:
                </p>
                <div className="w-full flex flex-wrap gap-2">
                  {data.borders ? data.borders.map((border, index) => {
                    return (
                      <div
                        key={index}
                        className="shadow-borders p-4 h-[28px] dark:bg-[#2B3844] flex items-center justify-center rounded-sm"
                      >
                        <p className="dark:text-white nunito font-[300]">
                          {borderNames(border)}
                        </p>
                      </div>
                    );
                  }):""}
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Country;
