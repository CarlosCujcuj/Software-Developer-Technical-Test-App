import {
  TITLE_FILTER,
  ALBUM_TITLE_FILTER,
  ALBUM_USER_EMAIL_FILTER,
  BASE_URL,
  OFFSET_FILTER,
  LIMIT_FILTER
} from '../config/constants'

export const requestPhotos = async (photoFilters) => {
  let url
  let response
  const {
    photoId,
    photoTitle,
    albumTitle,
    userEmail,
    offset,
    limit
  } = photoFilters

  if (photoId) {
    url = `${BASE_URL}/${photoId}`
  } else {
    const photoTitleFilter = photoTitle?.length ? `&${TITLE_FILTER}=${photoTitle}` : ''
    const albumTitleFilter = albumTitle?.length ? `&${ALBUM_TITLE_FILTER}=${albumTitle}` : ''
    const userEmailFilter = userEmail?.length ? `&${ALBUM_USER_EMAIL_FILTER}=${userEmail}` : ''

    const offsetFilter = offset?.length ? `&${OFFSET_FILTER}=${offset}` : ''
    const limitFilter = limit?.length ? `&${LIMIT_FILTER}=${limit}` : ''

    url = `${BASE_URL}/?${photoTitleFilter}${albumTitleFilter}${userEmailFilter}${offsetFilter}${limitFilter}`
    url = url.replace('&', '') // replace first & to send a proper url
  }

  try {
    response = await fetch(url)

    if (response.status !== 200) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    return responseJson
  }  catch (err) {
    return []
  }
}