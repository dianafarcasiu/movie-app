export default function Heading({ children }) {
  return (
    <div className="heading">
      <h4>{children}</h4>
      <div className="underline"></div>
    </div>
  );
}
