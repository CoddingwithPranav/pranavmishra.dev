import { FaFacebook, FaGithub } from "react-icons/fa";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <>
    <footer className="w-full mt-20 py-8 px-6 md:px-12">
    <div className="fade_rule w-full"></div>
      <div className="flex flex-col justify-between gap-16 max-w-6xl mx-auto pt-20"> 
        <div className="flex justify-between px-20 gap-5">
            <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-secondary dark:text-foreground mb-2">
            Pranav Mishra
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-xs mx-auto md:mx-0">
            Help you rebuild and redefine fundamental concepts through mental models.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-primary">
            <a href="https://github.com" aria-label="GitHub">
              <FaGithub className="text-xl hover:text-foreground transition-colors" />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="text-xl hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div>
            <h3 className="text-lg font-medium text-primary mb-3">General</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-primary mb-3">The Website</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Bucket List</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Uses</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Side Quests</a></li>
            </ul>
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-medium text-secondary dark:text-foreground mb-3">
            Subscribe to Clarence's blog newsletter
          </h3>
          <p className="text-muted-foreground mb-4 max-w-xs mx-auto md:mx-0">
            Don't miss out 😉. Get an email whenever I post, no spam.
          </p>
        
          <Input type="email" placeholder="Your email address" color="white" />

        </div>
        </div>
        <div className="fade_rule w-full"></div>
        <div className="text-center  md:mt-0">
          <span className="text-muted-foreground">
            © 2024 Pranav Mishra. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
    </>

  );
}