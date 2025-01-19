import { Link } from "react-router-dom";
import Card from "../components/Card";
import Header from "../components/Header";
import { trips } from "../data/db";
import { useState } from "react";

export default function HomePage() {
  const [menuDisplayed, setMenuDisplayed] = useState("d-none");
  const handleMenuDisplayed = () => {
    menuDisplayed === "d-none"
      ? setMenuDisplayed("")
      : setMenuDisplayed("d-none");
  };

  return (
    <>
      <Header page="home" isDisplayedHandler={handleMenuDisplayed} />
      <main className="container px-4 mt-4 mb-10 h-100">
        <h1 className="mb-1 text-center fw-bold">I TUOI VIAGGI ATTIVI</h1>
        <div className="card-trip-container">
          {trips.map((trip) => {
            return <Card key={trip.id} trip={trip}></Card>;
          })}
        </div>
        <div className={`user-menu ${menuDisplayed}`}>
          <div className="user-welcome">
            <span>
              <strong>benvenuto Marco!</strong>
            </span>
          </div>
          <ul>
            <li>Il tuo profilo</li>
            <hr />
            <Link className="link-user-menu" to={"/new-trip"}>
              <li>Aggiungi viaggio</li>
            </Link>
            <hr />
            <Link className="link-user-menu" to={"/new-contact"}>
              <li>Aggiungi contatto</li>
            </Link>
          </ul>
        </div>
      </main>
    </>
  );
}
