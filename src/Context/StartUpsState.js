import { useState } from "react";
import StartUpContext from "./StartUpContext";

const StartUpsState = (props) => {
  const host = "http://localhost:5001";
  const initialStartUpState = [];
  const [StartUps, setStartUps] = useState(initialStartUpState);

  const getStartUps = async () => {
    try {
      const response = await fetch(`${host}/api/Startups`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStartUps(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const createStartUp = async (StartUpData) => {
    try {
      const response = await fetch(`${host}/api/Startups/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(StartUpData),
      });
      const data = await response.json();
      setStartUps(StartUps.concat(data));
    } catch (error) {
      console.error(error.message);
    }
  };
  const UpdateStartUp = async (id, updatedStartUpData) => {
    try {
      const response = await fetch(`${host}/api/Startups/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStartUpData),
      });

      if (!response.ok) {
        throw new Error("Failed to update startup");
      }

      const updatedStartUp = await response.json();
      setStartUps((startUps) => {
        const updatedStartUps = [...startUps];
        const updatedStartUpIndex = updatedStartUps.findIndex(
          (startUp) => startUp.id === updatedStartUp.id
        );

        if (updatedStartUpIndex !== -1) {
          updatedStartUps[updatedStartUpIndex] = updatedStartUp;
        }

        return updatedStartUps;
      });
    } catch (error) {
      console.error("UpdateStartUp error:", error.message);
    }
  };

  const deleteStartUp = async (id) => {
    try {
      const response = await fetch(`${host}/api/Startups/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      // const updatedStartUps = StartUps.filter((startUp) => {
      //   return startUp._id === id;
      // });
      setStartUps((prevStartUps) => prevStartUps.filter((startup) => startup._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
      <StartUpContext.Provider value={{ StartUps, getStartUps, createStartUp, UpdateStartUp,deleteStartUp }}>
    {props.children}
  </StartUpContext.Provider>
);
};

export default StartUpsState;
