import ContactsCard from "../components/ContactsCard";
import Header from "../components/Header";
import { contacts } from "../data/db";

export default function Contacts() {
  return (
    <>
      <Header page="trip" />
      <h1 className="text-center my-4">Contacts</h1>
      <div className="container contacts-container">
        {contacts.map((contact) => {
          return (
            <div className="contact-card-container">
              <ContactsCard contact={contact} />
            </div>
          );
        })}
      </div>
    </>
  );
}
