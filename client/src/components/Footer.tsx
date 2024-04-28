import { Github } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="flex-center w-full bg-primary h-24">
      <div className="flex-center gap-2">
        <Github className="size-8" /> github.com/tigertony2536
      </div>
    </div>
  );
};

export default Footer;
