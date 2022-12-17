const Cart = ({image, title, description}) => {
  return ( 
    <div className="card card-side bgbae-100 shadow-xl">
      <figure>
        <img src={`/images/${image}`} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">مشاهده</button>
        </div>
      </div>
    </div>
  );
}
 
export default Cart;