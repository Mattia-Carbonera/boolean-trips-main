import { useState } from "react";
import Header from "../components/Header";
import { contacts } from "../data/db";
import { Link } from "react-router-dom";
import ContactsCard from "../components/ContactsCard";

export default function AddContact() {
  // * NEW ID
  // * FINDE ID OF TRIPS DB
  const findLastId = () => {
    const idArray = contacts.map((contact) => contact.id);
    const highestId = Math.max(...idArray);
    return highestId + 1;
  };
  let newId = findLastId();

  //   * STRUCTURE OF OBJECT
  const [newContact, setNewContact] = useState({
    id: newId,
    trip_id: [],
    nome: "",
    cognome: "",
    email: "",
    cod_fiscale: "",
    numero_di_telefono: "",
    img: "/defaultUserImg.jpg",
  });
  // * HANDLER INPUT
  const handleInputContact = (e) => {
    console.log(e.target.name, e.target.value);
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  //   * HANDLER FORM
  const handleInputForm = (e) => {
    e.preventDefault();

    contacts.push(newContact);
    console.log(contacts);
  };

  //   * ANDLER CONFIRM CONTACT ADDED
  const [handleTripAdded, setHandleTripAdded] = useState("d-none");
  const [handlePageDisplayed, setHandlePageDisplayed] = useState("");

  const handleAddContactButton = () => {
    handleTripAdded == "d-none"
      ? setHandleTripAdded("")
      : setHandleTripAdded("d-none");

    handlePageDisplayed == ""
      ? setHandlePageDisplayed("d-none")
      : setHandlePageDisplayed("");
  };

  return (
    <>
      <Header page="trip" />
      <main>
        <h1 className={`${handlePageDisplayed} text-center my-4`}>
          Nuovo contatto
        </h1>
        <div className="container my-3">
          <form
            onSubmit={handleInputForm}
            className={handlePageDisplayed}
            action=""
          >
            <div className="input-nome input-add-contact-container">
              <label htmlFor="nome">Nome</label>
              <input
                required
                onChange={handleInputContact}
                type="text"
                name="nome"
              />
            </div>
            <div className="input-cognome input-add-contact-container">
              <label htmlFor="cognome">Cognome</label>
              <input
                required
                onChange={handleInputContact}
                type="text"
                name="cognome"
              />
            </div>
            <div className="input-email input-add-contact-container">
              <label htmlFor="email">Email</label>
              <input
                required
                onChange={handleInputContact}
                type="email"
                name="email"
              />
            </div>
            <div className="input-cod-fiscale input-add-contact-container">
              <label htmlFor="cod_fiscale">Codice fiscale</label>
              <input
                required
                onChange={handleInputContact}
                type="text"
                name="cod_fiscale"
              />
            </div>
            <div className="input-tel input-add-contact-container">
              <label htmlFor="numero_di_telefono">Tel.</label>
              <input
                required
                onChange={handleInputContact}
                type="text"
                name="numero_di_telefono"
              />
            </div>
            <div className="input-img input-add-contact-container">
              <label htmlFor="">Immagine</label>
              <select onChange={handleInputContact} name="img" id="">
                <option value="">Seleziona l'immagine</option>
                <option value="1.png">immagine 1</option>
                <option value="2.png">immagine 2</option>
                <option value="3.png">immagine 3</option>
                <option value="4.png">immagine 4</option>
                <option value="5.png">immagine 5</option>
                <option value="6.png">immagine 6</option>
                <option value="7.png">immagine 7</option>
                <option value="8.png">immagine 8</option>
                <option value="9.png">immagine 9</option>
              </select>
            </div>
            <div className="btn-container text-center">
              <button
                onClick={handleAddContactButton}
                className="btn btn-primary"
              >
                Aggiungi
              </button>
            </div>
          </form>

          {/* validation contact */}
          <div className={`trip-added-container ${handleTripAdded}`}>
            <div className="check-container">
              <span>
                <i class="fa-solid fa-check"></i>
              </span>
            </div>
            <h2>Viaggio aggiunto</h2>
            <ContactsCard contact={newContact} />
            <div className="btn-container mt-3">
              <Link to={"/"}>
                <button className="btn btn-primary mt-3">
                  Torna alla Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
