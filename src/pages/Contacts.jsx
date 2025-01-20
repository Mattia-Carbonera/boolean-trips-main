import { useState, useEffect } from "react";
import ContactsCard from "../components/ContactsCard";
import Header from "../components/Header";
import { contacts } from "../data/db";
import { trips } from "../data/db";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default function Contacts() {
  const [menuDisplayed, setMenuDisplayed] = useState("d-none");
  const handleMenuDisplayed = () => {
    menuDisplayed === "d-none"
      ? setMenuDisplayed("")
      : setMenuDisplayed("d-none");
  };

  const [inputValue, setInputValue] = useState();

  const [newContacts, setNewContacts] = useState(contacts);

  function handleInput(e) {
    setInputValue(e.target.value);

    setNewContacts(contacts);

    const arrayContainsValue = [];
    newContacts.forEach((contact) => {
      const nomeIntero =
        contact.nome.toLowerCase() + contact.cognome.toLowerCase();
      if (nomeIntero.includes(inputValue.toLowerCase().replace(" ", ""))) {
        arrayContainsValue.push(contact.id);
      }
    });
    const newFilteredContacts = newContacts.filter((el) => {
      return arrayContainsValue.includes(el.id);
    });

    setNewContacts(newFilteredContacts);

    if (e.target.value == "") setNewContacts(contacts);
    if (e.target.value < inputValue) () => handleInput;
  }

  return (
    <>
      <Header page="trip" isDisplayedHandler={handleMenuDisplayed} />
      <main>
        <h1 className="text-center my-4">Contacts</h1>

        <form>
          <div className="input-group flex-nowrap mb-3 input-name-contact-page">
            <input
              type="text"
              className="form-control"
              placeholder="Ricerca per nome o cognome"
              aria-label="Ricerca per nome o cognome"
              aria-describedby="addon-wrapping"
              onChange={handleInput}
            />
          </div>
        </form>

        <div className="container contacts-container row g-3 m-auto">
          {newContacts.map((contact) => {
            return (
              <div
                key={contact.id}
                className="contact-card-container col-12 col-md-6 col-lg-4"
              >
                <ContactsCard contact={contact} />
              </div>
            );
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
