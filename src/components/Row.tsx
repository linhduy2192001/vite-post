import { Link } from "react-router-dom";
import { IPostData } from "../types/posts.type";

const Row = ({ userId, id, title, body, onClick }: IPostData) => {
  return (
    <tr>
      <th scope="row">{userId}</th>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>
        <Link to={`/posts/${id}`} className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={onClick}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
