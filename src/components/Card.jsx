import { Link } from "react-router-dom";

export default function Card({ trip }) {
  return (
    <>
      <div className="card-trip">
        <Link to={`/details/${trip.id}`} className="link-card-trip">
          <img src={trip.img} className="card-img-top" alt={trip.id} />
          <div className="trip-title">
            <h2>{trip.destinazione.toUpperCase()}</h2>
          </div>
        </Link>
        <div className="date-container">
          <span>
            Andata: <strong>{trip.data_inizio}</strong>
          </span>
          <span>
            Ritorno: <strong>{trip.data_fine}</strong>
          </span>
        </div>
      </div>
    </>
  );
}
