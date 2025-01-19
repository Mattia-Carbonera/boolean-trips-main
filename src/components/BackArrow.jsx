import { Link } from "react-router-dom";

export default function BackArrow() {
  return (
    <Link className="btn-backArrow" to="/">
      <i className="fa-solid fa-xl fa-chevron-left"></i>
    </Link>
  );
}
