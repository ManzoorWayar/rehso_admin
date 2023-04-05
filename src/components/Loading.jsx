import { Image } from "react-bootstrap";
import spinner from "../assets/img/spinner.gif";

const Loading = () => {
  return (
    <div className="mt-5 d-flex align-items-center justify-content-center">
      <Image src={spinner} style={{ width: "150px", height: "150px" }} />
    </div>
  );
};

export default Loading;
