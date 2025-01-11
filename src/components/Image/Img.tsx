import { FC, useEffect, useState } from "react";
import { BlankImage } from "../../assets";

interface InputProps {
  src: string;
  alt?: string;
  className?: string;
  id?: string;
}

const Img: FC<InputProps> = (props) => {
  const { src, alt, className, id } = props;
  const [imgSrc, setImgSrc] = useState(BlankImage);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  return <img id={id} src={imgSrc} alt={alt} className={`${className}`} />;
};

export default Img;
