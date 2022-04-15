import React from "react";
import { Container, Image, Menu, Icon } from "semantic-ui-react";
import { logout, signInWithGoogle } from "../firebase-config";
import myImg from "../logo.png";
import { Link, useLocation } from "react-router-dom";
import UserLogin from "./UserLogin";
import useWindowDimensions from "./hooks/useWindowDimensions";

export function NavBar({ user }) {
  let location = useLocation();
  const { height, width } = useWindowDimensions();
  let className = "";
  if (location.pathname === "/") {
    className = "home-page";
  }

  return (
    <Menu fixed="top" inverted className={className}>
      <Menu.Item as={Link} to="/" className={className + " nav-item"}>
        <Image
          size="mini"
          src={myImg}
          style={{
            marginRight: ".5em"
          }}
        />
        <strong>Spark</strong>
      </Menu.Item>

      <Menu.Item to="portfolio" className={className + " nav-item"} as={Link}>
        {width < 500 ? <Icon className="line graph" size='big'/> : "Portfolio Dashboard"}
      </Menu.Item>

      {/* <Link to="contact">
        <Menu.Item className={className + " nav-item"} as="div">
          Contact
        </Menu.Item>
      </Link> */}
      <div className="spacing-div" />

      <UserLogin user={user} />
    </Menu>
  );
}
