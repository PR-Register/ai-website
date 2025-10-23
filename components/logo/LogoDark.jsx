import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/assets/img_placeholder/hidental-logo.png";

const LogoDark = () => {
  return (
    <Link href='/'>
      <Image src={logo} alt='AIMass' width='125' height='24' />
    </Link>
  );
};

export default LogoDark;
