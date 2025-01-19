import BackArrow from "./BackArrow";

export default function Header({ page, isDisplayedHandler }) {
  return (
    <>
      <header>
        {page == "trip" && <BackArrow />}
        <h2>BoolTrips!</h2>
        <span onClick={isDisplayedHandler} className="container-icon">
          <i class="fa-solid fa-lg fa-user"></i>
        </span>
      </header>
    </>
  );
}
