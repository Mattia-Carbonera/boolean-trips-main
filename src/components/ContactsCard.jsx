import ContactModal from "./ContactModal";

export default function ContactsCard({ contact }) {
  const img = contact.img
    ? `/img//users-img/${contact.img}`
    : "/img//users-img/defaultUserImg.jpg";
  return (
    <>
      <ContactModal contact={contact} img={img} />
      <div className="col-12 col-md-6 col-lg-4">
        <div data-bs-toggle="modal" data-bs-target={`#${contact.id}`}>
          <div className="card card-contacts shadow">
            <div className="row g-0">
              <div className="col-4 container-img-contact">
                <img
                  src={img}
                  className="img-fluid rounded-start contact-img"
                  alt={contact.id}
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {contact.nome} {contact.cognome}
                  </h5>
                  <p>Vedi contatto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
