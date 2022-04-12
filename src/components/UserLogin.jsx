import React from "react";
import { Container, Image, Menu, Icon, Popup } from "semantic-ui-react";
import { logout, signInWithGoogle } from "../firebase-config";
import myImg from "../logo.png";
import { Link, useLocation } from "react-router-dom";

export default function UserLogin({ user }) {
  const location = useLocation();
  console.log(user);
  if (location.pathname === "/") {
    return (
      <Popup
        trigger={<Icon className="user circle home" size="big" />}
        content={<UserDetails user={user} flexDir={"vertical"} />}
        on="click"
        inverted
      />
    );
  } else {
    return <UserDetails user={user} />;
  }
}

function UserDetails({ user, flexDir }) {
  console.log(user);

  return (
    <Menu inverted className={flexDir}>
      {user ? (
        <>
          <Menu.Item as="div" header>
            {flexDir ? null : (
              <Image
                size="mini"
                className="user-icon"
                src={user.photoURL}
                style={{
                  marginRight: ".5em"
                }}
              />
            )}
            <div className="user-detail-mini">
              <div className="user-details">{user.displayName}</div>
              <div className="user-details">{user.email}</div>
            </div>
          </Menu.Item>
          <Menu.Item as="button" className="sign-in-btn" onClick={logout}>
            Sign out
          </Menu.Item>
        </>
      ) : (
        <Menu.Item
          as="button"
          className="sign-in-btn"
          onClick={signInWithGoogle}
        >
          Sign in using Google
        </Menu.Item>
      )}
    </Menu>
  );
}
