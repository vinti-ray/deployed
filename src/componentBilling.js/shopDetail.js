import jwt_decode from 'jwt-decode';
import "./shop.css"

function ShopDetail(){
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    let name=decodedToken.name
    let email=localStorage.getItem("email")
    return(
        <div className='shop'>
            <h3>{name}</h3>
            {/* <p style={{color:"black"}}>{email}</p> */}
        </div>
    )
}
export default ShopDetail




