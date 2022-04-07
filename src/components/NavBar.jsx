import React from 'react'
import { Container, Image, Menu } from 'semantic-ui-react'
import { logout, signInWithGoogle } from '../firebase-config'
import myImg from '../logo.png'
import { Link } from 'react-router-dom'

export function NavBar({ user }) {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image
            size='mini'
            src={myImg}
            style={{
              marginRight: '.5em',
            }}
          />
          Spark
        </Menu.Item>
        <Menu.Item as='a'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Link to='portfolio'>Portfolio</Link>
        </Menu.Item>
        <Menu.Item as='a'>
          <Link to='contact'>Contact</Link>
        </Menu.Item>
      </Container>
      {user ? (
        <>
          <Menu.Item as='a' header>
            <Image
              size='mini'
              className='user-icon'
              src={user.photoURL}
              style={{
                marginRight: '.5em',
              }}
            />
            <div className='user-detail-mini'>
              <div className='display-name'>{user.displayName}</div>
              <div className='display-email'>{user.email}</div>
            </div>
          </Menu.Item>
          <Menu.Item as='a' className='sign-in-btn' onClick={logout}>
            Sign out
          </Menu.Item>
        </>
      ) : (
        <Menu.Item as='a' className='sign-in-btn' onClick={signInWithGoogle}>
          Sign in using Google
        </Menu.Item>
      )}
    </Menu>
  )
}
