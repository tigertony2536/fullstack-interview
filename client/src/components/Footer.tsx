import { Github } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="w-full h-16 flex-center bg-primary">
      <div className="gap-2 flex-center">
        <Github className="size-8" /> github.com/tigertony2536
      </div>
    </div>
  );
};

export default Footer;
