import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../UI/Loader";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/joy/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Divider } from "@mui/material";

const MWFeeds = () => {
  const navigation = useNavigate();
  const [apiStatus, setApiStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await axios.get(
          // "http://mtool-env.eba-iaphq2wi.eu-west-1.elasticbeanstalk.com:3005/api/MWFeeds/status"
          "http://localhost:3005/api/MWFeeds/status"
        );
        setApiStatus(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch API status initially
    fetchApiStatus();

    // Set interval to fetch API status every 5 seconds
    const intervalId = setInterval(fetchApiStatus, 20000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="apiContent">
      <h3 style={{ textAlign: "center", fontSize: "22px" }}>MWFeeds API</h3>
      <div className="text-center subApiCard">
        <br />
        <table style={{ width: "100%", marginRight: "2vh", marginLeft: "1vh" }}>
          <tr>
            <td style={{ width: "700px" }}>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="subApiListScrollET subApiCardDesignET">
                  <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                    API Status
                  </h3>
                  <div className="apiButton">
                    {Object.keys(apiStatus).map((subAPI) => (
                      <ListItem key={subAPI} className="apiButtonItem">
                        <ListItemButton className="apiButton">
                          <div>
                            {/* <p>
                              {subAPI} is currently{" "}
                              {apiStatus[subAPI].startsWith("Operational")
                                ? "working"
                                : "not working"}
                              .
                            </p> */}
                            <div className="apiButton">
                              <Tooltip
                                variant="outlined"
                                title={`${apiStatus[subAPI].split(",")[0]}`}
                                color={
                                  apiStatus[subAPI].startsWith("Operational")
                                    ? "success"
                                    : "danger"
                                }
                              >
                                <Button
                                  className="statusButton"
                                  style={{
                                    width: "210px",
                                    backgroundColor: apiStatus[
                                      subAPI
                                    ].startsWith("Operational")
                                      ? "green"
                                      : "red",
                                  }}
                                >
                                  {apiStatus[subAPI].startsWith(
                                    "Operational"
                                  ) ? (
                                    <>
                                      <i className="fa-regular fa-thumbs-up"></i>{" "}
                                      {subAPI}
                                    </>
                                  ) : (
                                    <>
                                      <i className="fa-regular fa-thumbs-down"></i>{" "}
                                      {subAPI}{" "}
                                    </>
                                  )}
                                </Button>
                              </Tooltip>
                              <br />
                              <Divider variant="middle" />
                            </div>
                          </div>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </div>
                </div>
              )}
            </td>
            <td style={{ width: "", paddingLeft: "3vh" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="subApiListScrollETR subApiCardDesignESB">
                        <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                          Code Check
                        </h3>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <div className="subApiListScrollETR subApiCardDesignESB">
                        <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                          Infrastructure Level
                        </h3>
                      </div>
                    )}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <br />
        <Button onClick={() => navigation("/")} className="genericButton">
          Back to Main Page
        </Button>
      </div>
    </div>
  );
};

export default MWFeeds;
