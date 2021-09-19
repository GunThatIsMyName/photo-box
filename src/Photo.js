import React from 'react'

const Photo = ({urls: { regular: image },
  alt_description: description,
  created_at,
  user: {
    username,
    bio,
    profile_image: { medium },
  },}) => {
  return (
    <article className="photo">
      <img src={image} alt={description} />
      <div className="photo-info">
        <h4>{username}</h4>
        <img className="user-img" src={medium} alt={username} />
      </div>
    </article>
  )
}

export default Photo
