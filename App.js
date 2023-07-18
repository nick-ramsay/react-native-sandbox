import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";
import { useInput } from "./assets/sharedFunctions/sharedFunctions";
import logo from "./assets/images/github_logos/logo.svg";
import GithubLogo from "./assets/images/github_logos/GitHub_Logo_White.png";
import "./App.css";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function App() {
  var [messages, setMessages] = useState([]);
  var [testHook, setTestHook] = useInput();

  const renderMessages = () => {
    let currentMessages = localStorage.getItem("messages");
    if (currentMessages !== null) {
      setMessages((messages) => JSON.parse(currentMessages));
    }
  };

  const saveMessage = (event) => {
    let tempMessages = messages;
    let newMessage = document.getElementById("messageInput").value;
    if (newMessage !== "") {
      tempMessages.unshift({
        date: Date(),
        message: newMessage,
      });
      localStorage.setItem("messages", JSON.stringify(tempMessages));
      document.getElementById("messageInput").value = "";
      renderMessages();
    }
  };

  const deleteMessage = (event) => {
    let messageDeletionID = event.currentTarget.dataset.message_id;
    let currentMessages = messages;
    currentMessages.splice(messageDeletionID, 1);
    localStorage.setItem("messages", JSON.stringify(currentMessages));
    renderMessages();
  };

  useEffect(() => {
    renderMessages();
   }, []
  );

  return (
    <div>
    <h1>React Native Sandbox</h1>
    <div className="container">
    <div className="col-md-12">
      <form className="mt-3">
        <div className="form-row text-center">
          <div className="col">
            <input
              type="text"
              placeholder="Enter your message here"
              className="form-control"
              id="messageInput"
              name="messageInput"
              aria-describedby="messageHelp"
            />
          </div>
        </div>
        <div className="form-row text-center">
          <div className="col mt-3">
            <div
              type="button"
              className="btn btn-custom"
              tabIndex="0"
              onClick={saveMessage}
              data-dd-action-name="Clicked Custom Action Button Again"
            >
              Submit
            </div>
          </div>
        </div>
      </form>
      <p style={{ color: "#e83e8c" }} className="mt-3 mb-1">
              {messages.length === 0
                ? "No Messages"
                : messages.length +
                  (messages.length > 1 ? " messages" : " message")}
            </p>
            {messages.map((message, i) => (
              <div className="col-md-12 mt-2 mb-2 message-card" key={i}>
                <div className="pt-1">
                  <div style={{ fontStyle: "italic" }} className="mt-1 mb-1">
                    "{message.message}"
                  </div>
                  <div style={{ color: "#61dafb" }} className="mb-2">
                    {weekday[new Date(message.date).getDay()] +
                      ", " +
                      new Date(message.date).getDate() +
                      " " +
                      month[new Date(message.date).getMonth()] +
                      " " +
                      new Date(message.date).getFullYear() +
                      " " +
                      (new Date(message.date).getHours() < 13
                        ? new Date(message.date).getHours()
                        : new Date(message.date).getHours() - 12) +
                      ":" +
                      (new Date(message.date).getMinutes() > 9
                        ? new Date(message.date).getMinutes()
                        : "0" + new Date(message.date).getMinutes()) +
                      " " +
                      (new Date(message.date).getHours() > 11 ? "PM" : "AM")}
                  </div>
                  <div
                    className="btn btn-sm btn-custom-red mb-1 mt-1"
                    data-message_id={i}
                    onClick={deleteMessage}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
    </div>
    </div>
  </div>
  );
};