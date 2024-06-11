
import Card from 'react-bootstrap/Card';

function Cards(props) {
  return (
    <Card style={{ width: "18rem", maxHeight: "360px",margin:"10px" }}>
      <Card.Img variant="top" src={props.product.image}  style={{ height: "150px", objectFit: "fill" }} />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>
          {props.product.category}
        </Card.Text>
        <h4>Price ₹{props.product.price}</h4>
      </Card.Body>
    </Card>
  );
}

export default Cards;