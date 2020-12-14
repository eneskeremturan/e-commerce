import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Kargo</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <Form.Label>Adres</Form.Label>
          <Form.Control
            type="text"
            placeholder="Adres Giriniz"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="city">
          <Form.Label>Şehir</Form.Label>
          <Form.Control
            type="text"
            placeholder="Şehir Giriniz"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="postalCode">
          <Form.Label>Posta Kodu</Form.Label>
          <Form.Control
            type="text"
            placeholder="Posta Kodu Giriniz"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="country">
          <Form.Label>Ülke</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ülke Giriniz"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </FormGroup>

        <Button type="submit" variant="primary">
          Devam
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
