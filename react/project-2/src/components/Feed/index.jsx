export default function Feed({ id, title, description, author, likes }) {

  return (
    <div>
      Id: {id}
      <br />
      Title: {title}
      <br />
      Description: {description}
      <br />
      Author: {author}
      <br />
      Likes: {likes}
      <hr />
    </div>
  )
}