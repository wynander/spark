import React from 'react'
import { Container, Image, Menu } from 'semantic-ui-react'
import { logout, signInWithGoogle } from '../firebase-config'
import myImg from '../logo.png'
import { Link } from 'react-router-dom'

export function NavBar({ user }) {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Link to='/'>
          <Menu.Item as='div' header>
            <Image
              size='mini'
              src={myImg}
              style={{
                marginRight: '.5em',
              }}
            />
            Spark
          </Menu.Item>
        </Link>
        <Link to='/'>
          <Menu.Item className='nav-item' as='div'>
            Home
          </Menu.Item>
        </Link>
        <Link to='portfolio'>
          <Menu.Item className='nav-item' as='div'>
            Portfolio
          </Menu.Item>
        </Link>
        <Link to='contact'>
          <Menu.Item className='nav-item' as='div'>
            Contact
          </Menu.Item>
        </Link>
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
