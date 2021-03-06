import React from "react";
import { Row, Col } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import Styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

import ProductItemImage from "../../images/product-item-image.png";
import { addToCart } from "../../api/cart.js";
//page that shows when a user clicks on a product
function ProductItem(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  return (
    <HashLink
      style={{ textDecoration: "none", color: "black" }}
      smooth
      to={"/products/" + props.product._id + "#top"}
    >
      <div className={Styles.ProductItem}>
        <Row>
          <Col>
            <img
              className={Styles.ProductItemImage}
              src={props.product.imgURls[0].imgURL}
              alt={props.product.productName}
            />
          </Col>
        </Row>
        <Row className={Styles.NameRatingRow}>
          <Col>
            {" "}
            <p className={Styles.ProductName}>{props.product.productName}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className={Styles.BrandName}>{props.product.brand}</p>
          </Col>
        </Row>
        <Row className={Styles.NameRatingRow} style={{ marginTop: "5px" }}>
          <Col>
            {" "}
            <p className={Styles.SellingPrice}>
              {formatter.format(props.product.sellingPrice)}
            </p>
          </Col>
          <Col xl={4} style={{ padding: "0px" }}>
            {" "}
            <p style={{ float: "right", marginBottom: "0px" }}>
              {props.product.averageRatingScore}
            </p>
            <span
              style={{
                color: "#F3D63C",
                float: "right",
                fontSize: "21px",
                marginRight: "3px",
              }}
              class="material-icons"
            >
              star_border
            </span>
            {/* <div
              onClick={() => {
                addToCart(); //when the button is clicked add to cart functionality takes place
              }} //Button for Add to cart functionality
              style={{
                backgroundColor: "#FADA35",
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "3px",
              }}
            >
              <p>ADD TO CART</p>
            </div> */}
          </Col>
        </Row>
      </div>
    </HashLink>
  );
}

export default ProductItem;
