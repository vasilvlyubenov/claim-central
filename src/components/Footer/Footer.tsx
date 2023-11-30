import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
      <footer className="bg-white text-central font-semibold py-4">
        <div className="container mx-auto flex flex-row justify-center text-center items-center gap-2">
            <p>&copy; </p><a href="https://github.com/vasilvlyubenov" target='__blank'>Vasil Lyubenov - <FontAwesomeIcon icon={faGithub} /></a>
        </div>
      </footer>
    );
  }