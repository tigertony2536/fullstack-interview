const Logo = ({ width }: { width: string }) => {
  return (
    <img
      src="https://www.ticket2attraction.com/Assets/web-logo.png"
      alt="ticket2attraction's logo"
      width={width}
      className={`bg-white aspect-auto `}
    />
  );
};

export default Logo;
