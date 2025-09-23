import {Link} from "react-router-dom";

const BackButton = () => {
  return (
    <div>
      <div className=" absolute top-3 md:top-10 left-4 md:left-10">
        <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 font-bold"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        </Link>
      </div>
    </div>
  );
};

export default BackButton;
