import Logo from "./Logo";

const Header = () => {
  return (
    <div className="w-full bg-primary pl-12 gap-4 h-24 flex justify-start items-center">
      <Logo width={"160px"} />
      <h3 className="text-white">Tickets2Attraction</h3>
    </div>
  );
};

export default Header;
