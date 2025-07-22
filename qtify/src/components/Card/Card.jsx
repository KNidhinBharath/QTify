import Chip from '@mui/material/Chip';
import Style from "./Card.module.css";

export function Card({ title, follows, image}) 
{
 
  return (
    <div className={Style.wrapper}>
      <div className={Style.card}>
        <img src={image} alt={title} className={Style.cardImage} />
        <div className={Style.banner}>
          <Chip label={`${follows} Follows`} variant="outlined" className={Style.chip} />
        </div>
      </div>
      <div className={Style.titleWrapper}> 
         <h5 className={Style.cardTitle}>{title}</h5>
      </div>
     </div>
  );
}

export default Card;