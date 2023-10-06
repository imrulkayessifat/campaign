'use client';

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined ;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
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