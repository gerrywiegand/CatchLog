import { HourGlass } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <HourGlass
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="hourglass-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
