const Cart = ({image, title, description}) => {
  return ( 
    <div className="bg-base-200 bg-opacity-80 card card-side shadow-md">
      <figure>
        <img className="h-44 w-44" src={`/images/${image}`} alt="Movie" />
      </figure>
      <div className="card-body" dir="rtl">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn btn-primary">مشاهده</button>
        </div>
      </div>
    </div>
  );
}
 
export default Cart;