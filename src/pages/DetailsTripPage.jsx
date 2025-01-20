import { useParams } from "react-router-dom";
import { contacts } from "../data/db";
import { trips } from "../data/db";
import ContactsCard from "../components/ContactsCard";
import { useState } from "react";
import Header from "../components/Header";
import DeleteItem from "../components/DeleteItem";
import { Link } from "react-router-dom";

export default function DetailsTripPage() {
  const [menuDisplayed, setMenuDisplayed] = useState("d-none");
  const handleMenuDisplayed = () => {
    menuDisplayed === "d-none"
      ? setMenuDisplayed("")
      : setMenuDisplayed("d-none");
  };

  const [inputValue, setInputValue] = useState();
  const { id } = useParams();

  // modificato

  const contactsInThisTrip = contacts.filter((contact) =>
    contact.trip_id.includes(parseInt(id))
  );

  // console.log(contacts[8].trip_id[0]);
  // console.log(contactsInThisTrip);

  // ---------------------------
  const trip = trips.find((trip) => trip.id == id);
  const [newContacts, setNewContacts] = useState(contactsInThisTrip);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const arrayContainsValue = [];
    contactsInThisTrip.forEach((contact) => {
      const nomeIntero =
        contact.nome.toLowerCase() + contact.cognome.toLowerCase();
      if (nomeIntero.includes(inputValue.toLowerCase().replace(" ", ""))) {
        arrayContainsValue.push(contact.id);
      }
    });
    const newFilteredContacts = contactsInThisTrip.filter((el) => {
      return arrayContainsValue.includes(el.id);
    });
    setNewContacts(newFilteredContacts);
  }

  return (
    <>
      <Header page="trip" isDisplayedHandler={handleMenuDisplayed} />
      <main className="mb-10 h-100">
        <div className="container-trip-cover-img">
          <h1>{trip.destinazione.toUpperCase()}</h1>
          <img className="trip-cover-img" src={trip.img} alt={trip.id} />
        </div>

        <div className="container px-4 mt-4">
          <div className="flex-sm-row flex-column d-flex justify-content-between">
            <h2 className="mb-4 me-3">Rubrica viaggio</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group flex-nowrap mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ricerca per nome o cognome"
                  aria-label="Ricerca per nome o cognome"
                  aria-describedby="addon-wrapping"
                  onChange={handleInput}
                />
                <span className="input-group-text" id="addon-wrapping">
                  <button>
                    <i className="fa-solid fa-lg fa-magnifying-glass"></i>
                  </button>
                </span>
              </div>
            </form>
          </div>

          <div className="row g-3">
            {newContacts.map((contact) => {
              return (
                <ContactsCard key={contact.id} contact={contact}></ContactsCard>
              );
            })}
          </div>
        </div>
        <DeleteItem array={trips} id={id} navigateTo={"/"} />

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
            <hr />
            <Link className="link-user-menu" to={"/contacts"}>
              <li>Contatti</li>
            </Link>
          </ul>
        </div>
      </main>
    </>
  );
}
