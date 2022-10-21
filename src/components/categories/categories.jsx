import Cart from "@/components/common/cart";

const data = [
  {title:"ایرانی", description:"غذای ایرانی", image:"https://picsum.photos/200/300"},
  {title:"خارجی", description:"غذای خارجی", image:"https://picsum.photos/200/300"}
]

const Categories = () => {
  return (
    <>
      {data.map(props => <Cart {...props}/>)}
    </>
)};
 
export default Categories;