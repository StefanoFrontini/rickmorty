import type { ErrorType } from "../context/context";

const Error: React.FC<ErrorType> = ({ msg }) => {
  return (
    <section className="error-page section">
      <div className="error-container">
        <h1>{msg}</h1>
      </div>
    </section>
  );
};
export default Error;
