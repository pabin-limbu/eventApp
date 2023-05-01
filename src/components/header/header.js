import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="">
        <div className="topNav">
          <Image src={"/images/abin.jpg"} height={50} width={50} alt="logo" />
          <nav>
            <ul>
              <li>
                <Link href="/" passHref>
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/events">EVENTS</Link>
              </li>
              <li>
                <Link href="/about-us">ABOUT US</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title">Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </header>
  );
};
