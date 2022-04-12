import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";
import { logout, signInWithGoogle } from "../firebase-config";
import myImg from "../logo.png";
import { Link, useLocation } from "react-router-dom";
import UserLogin from './UserLogin'

export function NavBar({ user }) {
  let location = useLocation();
  let className = "";
  if (location.pathname === "/") {
    className = "home-page";
  }

  return (
    <Menu fixed="top" inverted className={className}>
      <Link to="/">
        <Menu.Item as="div" className={className + " nav-item"}>
          <Image
            size="mini"
            src={myImg}
            style={{
              marginRight: ".5em"
            }}
          />
          <strong>Spark</strong>
        </Menu.Item>
      </Link>

      <Link to="portfolio">
        <Menu.Item className={className + " nav-item"} as="div">
          Portfolio View
        </Menu.Item>
      </Link>
      {/* <Link to="contact">
        <Menu.Item className={className + " nav-item"} as="div">
          Contact
        </Menu.Item>
      </Link> */}
      <div className="spacing-div" />

      <UserLogin user={user}/>
    </Menu>
  );
}
