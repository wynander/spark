import React from 'react'
import { Container, Image, Menu, Icon, Popup } from 'semantic-ui-react'
import { logout, signInWithGoogle } from '../firebase-config'
import myImg from '../logo.png'
import { Link, useLocation } from 'react-router-dom'
import useWindowDimensions from './hooks/useWindowDimensions'

const UserDetails = ({ user, flexDir }) => (
  <Menu inverted className={flexDir}>
    <Menu.Item as='div' header>
      {flexDir ? null : (
        <Image
          size='mini'
          className='user-icon'
          src={user.photoURL}
          style={{
            marginRight: '.5em',
          }}
        />
      )}
      <div className='user-detail-mini'>
        <div className='user-details'>{user.displayName}</div>
        <div className='user-details'>{user.email}</div>
      </div>
    </Menu.Item>
    <Menu.Item as='button' className='sign-in-btn' onClick={logout}>
      Sign out
    </Menu.Item>
  </Menu>
)

const UserLogin = ({ user }) => {
  const { height, width } = useWindowDimensions()

  return (
    <>
      {user ? (
        <Popup
          trigger={<Icon className='user circle home' size='big' />}
          content={<UserDetails user={user} flexDir={'vertical'} />}
          on='click'
          inverted
        />
      ) : (
        <button id='sign-in-btn' onClick={signInWithGoogle}>
          {width < 500 ? <Icon size='big' className='sign in' /> : 'Sign In'}{' '}
        </button>
      )}
    </>
  )
}

export default UserLogin
