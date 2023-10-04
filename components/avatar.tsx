'use client';

import Image from "next/image";

interface AvatarProps {
  src: string ;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  console.log(src)
  return (
    <>{
      src && (<Image
        className="rounded-full"
        height="30"
        width="30"
        alt="Avatar"
        src={src}
      />)}
    </>


  );
}

export default Avatar;