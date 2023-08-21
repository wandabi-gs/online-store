import React from 'react'
import { MEDIA_URL } from '../../backend'

export const DisplayMedia = ({url, className}) => (
    <img src={`${MEDIA_URL}/${url}`} alt="" className={`object-cover ${className}`} />
  );