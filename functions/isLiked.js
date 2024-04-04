const isLiked = (array, user_id) => array?.some((item) => item.user_id == user_id)

export default isLiked
 