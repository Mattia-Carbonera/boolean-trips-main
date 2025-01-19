import { useState, useEffect } from "react";
import Header from "../components/Header";
import { contacts } from "../data/db";
import { trips } from "../data/db";
import { Link } from "react-router-dom";

export default function AddTrip() {
  // * FINDE ID OF TRIPS DB
  const findLastId = () => {
    const idArray = contacts.map((contact) => contact.id);
    const highestId = Math.max(...idArray);
    return highestId + 1;
  };
  let newId = findLastId();

  const [newTrip, setNewTrip] = useState({
    id: newId,
    destinazione: "",
    data_inizio: "",
    data_fine: "",
    img: "",
    contacts: [],
  });

  // * HANDLE DISPLAYED COMPONENT
  //  const displayed components
  const [isDisplayed, setIsDisplayed] = useState("d-none");
  const [isNotDisplayed, setIsNotDisplayed] = useState("");
  const [addedContactsDisplayed, setAddedContactsDisplayed] =
    useState("d-none");
  const [addTripButtonDisplayed, setAddTripButtonDisplayed] =
    useState("d-none");
  const [handleFormDisplayed, setHandleFormDisplayed] = useState("");
  const [handleTripAdded, setHandleTripAdded] = useState("d-none");
  const [handleFormInputDisplayed, setHandleFormInputDisplayed] = useState("");

  //   handler displayed components
  const hamdleButtonAddContacts = () => {
    isDisplayed == "d-none" ? setIsDisplayed("") : setIsDisplayed("d-none");
    isNotDisplayed == "" ? setIsNotDisplayed("d-none") : setIsNotDisplayed("");
  };
  const handleAddTripButton = () => {
    handleTripAdded == "d-none"
      ? setHandleTripAdded("")
      : setHandleTripAdded("d-none");

    handleFormInputDisplayed == ""
      ? setHandleFormInputDisplayed("d-none")
      : setHandleFormInputDisplayed("");
  };

  //   ----------------------------------

  //  * HANDLE BUTTON

  //   ! handle add contact
  const [contactsAdded, setContactsAdded] = useState([]);
  const [idContactsArray, setIdContactsArray] = useState([]);

  const handleAddMembersSelectButton = (e) => {
    let contactFounded = contacts.find(
      (contact) => contact.id == parseInt(e.target.value)
    );
    console.log(contactFounded);

    setContactsAdded([...contactsAdded, contactFounded]);
    const idContactFounded = contactFounded.id;
    setIdContactsArray([...idContactsArray, idContactFounded]);
  };

  useEffect(() => {
    setNewTrip({
      ...newTrip,
      contacts: idContactsArray,
    });
    console.log("useEffect eseguito");
  }, [idContactsArray]);
  //   ! ---

  //  * HANDLE SELECT
  const handleAddContactsButton = () => {
    setIsDisplayed("d-none");
    setAddedContactsDisplayed("");
    setAddTripButtonDisplayed("");
    setHandleFormDisplayed("d-none");
  };

  const handleSelectImgForm = (e) => {
    const selectedImage = `/img/trips-img/${e.target.value}`;
    setNewTrip({
      ...newTrip,
      img: selectedImage,
    });
  };

  // HANDLER INPUT & FORM

  const handleInput = (e) => {
    setNewTrip({
      ...newTrip,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewTripForm = (e) => {
    e.preventDefault();

    // () => handleAddMembersSelectButton;

    trips.push(newTrip);
    contacts.forEach((contact) => {
      if (newTrip.contacts.includes(contact.id)) {
        contact.trip_id.push(newTrip.id);
      }
    });
    // console.log(newTrip);
    // console.log(contacts);
    console.log(idContactsArray);
  };

  return (
    <>
      <Header page="trip" />
      <main>
        <div className="container add-trip-main-container">
          <h1 className={`${handleFormInputDisplayed}`}>Nuovo viaggio</h1>

          <form
            className={`form-add-trip ${handleFormInputDisplayed}`}
            onSubmit={handleNewTripForm}
          >
            <div className={`${handleFormDisplayed} form-container`}>
              <div className="trip-destination trip-details">
                <label htmlFor="trip-destination">Destinazione viaggio</label>
                <input
                  required
                  name="destinazione"
                  type="text"
                  placeholder="Nome"
                  onChange={handleInput}
                />
              </div>
              <div className="trip-date trip-details">
                <label className="d-block" htmlFor="">
                  Data di inizio e fine
                </label>
                <input
                  required
                  name="data_inizio"
                  className="mt-2"
                  type="date"
                  placeholder="Data di partenza"
                  onChange={handleInput}
                />
                <input
                  required
                  name="data_fine"
                  className="mt-2"
                  type="date"
                  placeholder="Data di ritorno"
                  onChange={handleInput}
                />
              </div>
              {/* select image */}
              <div className="select-trip-image mb-5">
                <label htmlFor="img" className="d-block">
                  Seleziona un'immagine
                </label>
                <select onChange={handleSelectImgForm} name="img" id="">
                  <option value="londra.jpg">londra</option>
                  <option value="roma.jpg">roma</option>
                  <option value="egitto.jpg">egitto</option>
                  <option value="norvegia.jpg">norvegia</option>
                  <option value="parigi.jpg">parigi</option>
                  <option value="madrid.jpg">madrid</option>
                  <option value="barcellona.jpg">barcellona</option>
                  <option value="marsiglia.jpg">marsiglia</option>
                </select>
              </div>
              {/* new contact */}
              <div className="add-contacts">
                <div
                  className={`${isNotDisplayed} btn btn-secondary d-block m-auto mb-3 btn-add-contacts`}
                  onClick={hamdleButtonAddContacts}
                >
                  aggiungi viaggiatori
                </div>
                <div className={`${isDisplayed} select-container`}>
                  <select
                    multiple
                    onClick={handleAddMembersSelectButton}
                    className={`select-contacts-add-trip`}
                    name="selectore-contacts"
                    id=""
                  >
                    {contacts.map((contact) => (
                      <option key={contact.id} value={contact.id}>
                        {contact.nome} {contact.cognome}
                      </option>
                    ))}
                  </select>
                  <div
                    className={`${isDisplayed} select-add-button`}
                    onClick={handleAddContactsButton}
                  >
                    <span>
                      <strong>Aggiungi membri</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* added contacts by select */}
            <div className="recup-trip-container">
              <div className={`${addedContactsDisplayed} added-contacts`}>
                <div className="trip-added-detail">
                  <h2 className="mb-3">
                    <strong>{newTrip.destinazione}</strong>
                  </h2>
                  <span>{newTrip.data_inizio}</span>
                  <span>{newTrip.data_fine}</span>
                </div>
                <span>
                  <strong>Contatti aggiunti:</strong>
                </span>
                <ul className="added-contacts-list">
                  {contactsAdded.map((contact) => (
                    <li key={contact.id}>
                      {contact.nome} {contact.cognome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="btn-container text-center">
                <button
                  onClick={handleAddTripButton}
                  className={`${addTripButtonDisplayed} btn btn-primary mt-5`}
                >
                  Aggiungi viaggio
                </button>
              </div>
            </div>
          </form>

          <div className={`trip-added-container ${handleTripAdded}`}>
            <div className="check-container">
              <span>
                <i class="fa-solid fa-check"></i>
              </span>
            </div>
            <h2>Viaggio aggiunto</h2>
            <div className="btn-container">
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
