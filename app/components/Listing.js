import Link from "next/link";
import React, { useEffect, useState } from "react";

const ListingPage = () => {
  const [data, setData] = useState([]);
  const [guardianData, setGuardianData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getDataFromNewsAPI = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=36fcad1b864945dda8d6c50cb992f040"
        );
        if (!response.ok) {
          throw new Error("Error fetching data from News API");
        }
        const responseData = await response.json();
        setData(responseData.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const getDataFromTheGuardian = async () => {
      try {
        const response = await fetch(
          "https://content.guardianapis.com/search?q=worldnews&api-key=7afd148c-8e4b-4929-9987-b49175ad2cb5"
        );
        if (!response.ok) {
          throw new Error("Error fetching data from The Guardian API");
        }
        const responseData = await response.json();
        setGuardianData(responseData.response.results);
      } catch (error) {
        console.error(error);
      }
    };

    getDataFromNewsAPI();
    getDataFromTheGuardian();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, activeTab, data, guardianData]);

  const filterData = () => {
    let items = [];
    if (activeTab === "all") {
      items = [...data, ...guardianData];
    } else if (activeTab === "newsapi") {
      items = data;
    } else if (activeTab === "guardian") {
      items = guardianData;
    }
    if (searchQuery) {
      items = items.filter((item) =>
        (item.title || item.webTitle)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredData(items);
  };
  const renderNewsItems = (items) => {
    return items.map((item, index) => (
      <div key={index} className="col-md-6 col-lg-4 col-xl-3">
        <div className="position-relative news-item">
          <div className="news-img">
            <img
              src={item.urlToImage || "../assets/img/Image_not_available.png"}
              className="img-fluid w-100"
              alt={item.author || item.webTitle}
            />
          </div>
          <div className="news-content">
            <div>
              <h4>{item.title || item.webTitle}</h4>
              <p>{item.description}</p>
              <p className="news-author">{item.author || item.webTitle}</p>
            </div>
            <div className="news-footer d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">
                {new Date(
                  item.publishedAt || item.webPublicationDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterData();
  };
  return (
    <>
      {/* Search Section Start */}
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="position-relative mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <input
                className="form-control border-2 border-primary w-full py-3 px-4"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search any News....."
              />
            </form>
          </div>
        </div>
      </div>
      {/* Search Section End */}

      {/* News Section Start */}
      <div className="container-fluid news py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>News API Data</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <a
                      className={`d-flex m-2 py-2 bg-light rounded-pill ${
                        activeTab === "all" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("all")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        All News
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`d-flex py-2 m-2 bg-light rounded-pill ${
                        activeTab === "newsapi" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("newsapi")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        News API
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`d-flex m-2 py-2 bg-light rounded-pill ${
                        activeTab === "guardian" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("guardian")}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        The Guardian API
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {renderNewsItems(filteredData)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* News Section End */}
    </>
  );
};

export default ListingPage;
