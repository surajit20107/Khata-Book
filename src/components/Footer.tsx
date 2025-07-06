import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mt-16">
      <footer className="bg-zinc-700 text-white text-center py-4 mt-12 md:mt-16 md:py-8">
        <p className="text-md md:text-base">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <p className="text-sm md:text-md mt-4">
          Made with ❤️ and lots of ☕ by Surajit
        </p>
        <div className="mt-4 flex justify-evenly">
          <a
            href="https://github.com/surajit20107"
            target="_blank"
            className="text-sm md:text-sm mt-2 flex items-center justify-center gap-1"
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://linkedin.com/in/surajit-jana20107"
            target="_blank"
            className="text-sm md:text-sm mt-2 flex items-center justify-center gap-1"
          >
            <FaLinkedin /> Linkedin
          </a>
          <a
            href="https://surajit-dev.vercel.app"
            target="_blank"
            className="text-sm md:text-sm mt-2 flex items-center justify-center gap-1"
          >
            <FaCode /> Portfolio
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
