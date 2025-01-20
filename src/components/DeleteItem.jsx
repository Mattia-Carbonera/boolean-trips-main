import { useState } from "react";
import { Link } from "react-router-dom";

export default function DeleteItem({ array, id }) {
  const [displayedMainPage, setDisplayedMainPage] = useState("");
  const [displayedModal, setDisplayedModal] = useState("d-none");
  const openLayover = () => {
    displayedMainPage == ""
      ? setDisplayedMainPage("d-none")
      : setDisplayedMainPage("");

    displayedModal == "d-none"
      ? setDisplayedModal("")
      : setDisplayedModal("d-none");
  };

  const handleDeleteItem = () => {
    const itemToDelete = array.find(
      (item) => parseInt(item.id) === parseInt(id)
    );
    console.log(itemToDelete);
    const index = array.indexOf(itemToDelete);
    console.log(`indexOff: ${index}`);
    const deleteItem = array.splice(index, 1);
    openLayover();
  };

  return (
    <>
      <div
        className={`${displayedMainPage} delete-btn-container my-3 text-center`}
      >
        <button onClick={openLayover} className="btn btn-danger">
          Elimina
        </button>
      </div>
      <div
        className={`layover-main-container ${displayedModal} delete-item-main-container`}
      >
        <div className={`layover-main-container ${displayedModal}`}>
          <h2 className="text-center">Sicuro di voler eliminare?</h2>
          <div className="layover-delete-item">
            <div className="layover-confirm-delete-item m-3">
              <button onClick={openLayover} className="btn btn-primary">
                Annulla
              </button>
            </div>
            <div className="layover-cancel-delete-item m-3">
              <Link to="/">
                <button
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleDeleteItem}
                  className="btn btn-danger"
                >
                  Conferma
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
