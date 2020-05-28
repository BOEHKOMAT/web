import React from 'react';
import { Link } from 'react-router-dom';

function RenderMenuItem({ dish }) {
   return (
        <Link to={`/menu/${dish.id}`}>
             {dish.name}
        </Link>
   );
}

const Menu = (props) => {
   const menu = props.dishes.dishes.map((dish) => {
      return (
         <div className="dish">
            <RenderMenuItem dish={dish} />
         </div>
      );
   });

  return (
     <div className="container">
        <div className="row">
           {menu}
        </div>
     </div>
  );

}
   
export default Menu;