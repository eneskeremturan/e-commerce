import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, history, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Geri Dön
      </Link>
      <FormContainer>
        <h1>Ürün Düzenle</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="name"
                placeholder="name Giriniz"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="price">
              <Form.Label>Fiyat</Form.Label>
              <Form.Control
                type="number"
                placeholder="Fiyat Giriniz"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="image">
              <Form.Label>Resim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Resim Yükleyiniz"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Dosya Seç"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </FormGroup>

            <FormGroup controlId="brand">
              <Form.Label>Marka</Form.Label>
              <Form.Control
                type="text"
                placeholder="Marka Giriniz"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="countInStock">
              <Form.Label>Adet</Form.Label>
              <Form.Control
                type="number"
                placeholder="Adet Giriniz"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="category">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kategori Giriniz"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="description">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Açıklama Giriniz"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <Button type="submit" variant="primary">
              Güncelle
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
