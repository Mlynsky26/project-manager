import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-secondary flex items-center justify-center z-50">
      <ClipLoader color="orange" speedMultiplier={0.5}/>
    </div>
  );
}
