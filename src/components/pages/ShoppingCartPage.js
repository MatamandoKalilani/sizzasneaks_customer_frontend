import React from "react";
import { sendEmailVerificationEmail } from "../../services/authentication.js";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogInPopUp } from "../../redux/actions/logInPopUp.js";
import { getUserCart } from "../../redux/actions/cart.js";

import {
  Card,
  ListGroup,
  Row,
  Col,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import CartItemLine from "../Cart/CartItemLine";
import { CircularProgress } from "@material-ui/core";
import CustomButton from "../general/Button.js";
import Styles from "./ShoppingCartPage.module.css";

function ShoppingCartPage() {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ZAR",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.firebase.auth);
  const shoppingCart = useSelector((state) => state.cart);
  const logInPopUpState = useSelector((state) => state.logInPopUpState);

  var [loadingRequest, setLoadingRequest] = React.useState(false);
  var [requestVerEmailState, setRequestVerEmailState] = React.useState(null);

  var [showCarUnavailableMessage, setShowCarUnavailableMessage] =
    React.useState(false);

  React.useEffect(() => {
    setShowCarUnavailableMessage(false);
    dispatch(getUserCart());
  }, []);

  function generateTaxAmount() {
    var totalTax = 0;
    shoppingCart.cart.cart.forEach((item) => {
      if (item.available) {
        totalTax = totalTax + item.sellingPrice * 0.15 * item.quantity;
      }
    });
    return totalTax;
  }

  function generateTotalCost() {
    var totalCost = 0;
    shoppingCart.cart.cart.forEach((item) => {
      if (item.available) {
        totalCost = totalCost + item.sellingPrice * item.quantity;
      }
    });
    totalCost = totalCost + shoppingCart.cart.cartDeliveryCharge;

    return totalCost;
  }

  function canPlaceOrder() {
    for (var item of shoppingCart.cart.cart) {
      if (!item.available) {
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      <Breadcrumb style={{ margin: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <Container className={Styles.container}>
        <Row>
          <Col xl={8} lg={8} md={12} xs={12} className={Styles.CardCol} >
            <Card>
              <Card.Header className={Styles.Name}> Cart Items</Card.Header>

              {authState.isEmpty ? (
                <div className={Styles.EmptyCartBanner}>
                  <p>Your shopping cart is empty.</p>
                  <CustomButton
                    label="Continue Shopping"
                    styles={{
                      backgroundColor: "#38CCCC",
                      margin: "20px auto",

                      textAlign: "center",
                    }}
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </div>
              ) : (
                <>
                  {shoppingCart.loading ? (
                    <div className={Styles.CartItemsLoading}>
                      <CircularProgress size={120} />
                    </div>
                  ) : (
                    <div>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {!shoppingCart.error ? (
                            <div>
                              {" "}
                              {shoppingCart.cart &&
                                (shoppingCart.cart.cart.length != 0 ? (
                                  shoppingCart.cart.cart.map((cartItem) => {
                                    return (
                                      <>
                                        <CartItemLine
                                          cartItemImage={
                                            cartItem.imgURls.imgURL
                                          }
                                          cartItemProductId={
                                            cartItem.product_id
                                          }
                                          cartItemName={cartItem.productName}
                                          cartItemQuantity={cartItem.quantity}
                                          cartItemOption={cartItem.option}
                                          cartItemColor={cartItem.option.color}
                                          cartItemSize={cartItem.option.size}
                                          available={cartItem.available}
                                          cartItemSellingPrice={
                                            cartItem.sellingPrice *
                                            cartItem.quantity
                                          }
                                        />
                                        <hr />
                                      </>
                                    );
                                  })
                                ) : (
                                  <div className={Styles.EmptyCartBanner}>
                                    <p>Your shopping cart is empty.</p>
                                    <CustomButton
                                      label="Continue Shopping"
                                      styles={{
                                        backgroundColor: "#38CCCC",
                                        margin: "20px auto",

                                        textAlign: "center",
                                      }}
                                      onClick={() => {
                                        history.push("/");
                                      }}
                                    />
                                  </div>
                                ))}{" "}
                            </div>
                          ) : (
                            <div className={Styles.EmptyCartBanner}>
                              <span
                                class="material-icons"
                                style={{ color: "red", fontSize: "45px" }}
                              >
                                error
                              </span>
                              <p>{shoppingCart.error}</p>
                            </div>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  )}
                </>
              )}
            </Card>
          </Col>

          {/* Summary detail card component */}
          <Col xl={4} lg={4} md={12} xs={12} className={Styles.CardCol}>
            <Card className="cardStyle">
              <Card.Header className={Styles.Name}> Cart Summary</Card.Header>

              {authState.isEmpty ? (
                <div className={Styles.EmptyCartBanner}>
                  <p>Your shopping cart is empty.</p>
                  <CustomButton
                    label="Continue Shopping"
                    styles={{
                      backgroundColor: "#38CCCC",
                      margin: "20px auto",

                      textAlign: "center",
                    }}
                    onClick={() => {
                      history.push("/");
                    }}
                  />
                </div>
              ) : (
                <>
                  {shoppingCart.loading ? (
                    <div className={Styles.CartSummaryLoading}>
                      <CircularProgress size={90} />
                    </div>
                  ) : (
                    <div>
                      {!shoppingCart.error ? (
                        <div>
                          {shoppingCart.cart &&
                            (shoppingCart.cart.cart.length != 0 ? (
                              <div>
                                <ListGroup variant="flush">
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        {" "}
                                        <p>
                                          Price ({shoppingCart.cart.cartCount}{" "}
                                          Items):{" "}
                                        </p>
                                      </Col>
                                      {/* <Col xl={1} /> */}
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryCostValue}
                                      >
                                        {formatter.format(
                                          generateTotalCost() -
                                            generateTaxAmount() -
                                            shoppingCart.cart.cartDeliveryCharge
                                        )}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        {" "}
                                        <p>Tax Amount: </p>{" "}
                                      </Col>

                                      <Col
                                        xl={6}
                                        className={Styles.SummaryCostValue}
                                      >
                                        {formatter.format(generateTaxAmount())}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={6}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        {" "}
                                        <p>Delivery Charge: </p>{" "}
                                      </Col>

                                      <Col
                                        xl={6}
                                        className={Styles.SummaryCostValue}
                                      >
                                        {formatter.format(
                                          shoppingCart.cart.cartDeliveryCharge
                                        )}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                  <ListGroup.Item
                                    className={Styles.SingleLineItem}
                                  >
                                    <Row>
                                      <Col
                                        xl={4}
                                        className={Styles.SummaryItemLabel}
                                      >
                                        <p>Total Amount: </p>
                                      </Col>

                                      <Col
                                        xl={8}
                                        className={Styles.SummaryCostValue}
                                        style={{
                                          fontSize: "23px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {formatter.format(generateTotalCost())}
                                      </Col>
                                    </Row>
                                  </ListGroup.Item>
                                </ListGroup>
                                <div
                                  style={{
                                    display: "grid",
                                    alignItems: "center",
                                    marginTop: "15px",
                                    marginBottom: "15px",
                                  }}
                                >
                                  {authState.isEmpty ||
                                  authState.isAnonymous ? (
                                    <div className={Styles.VerifiyEmailBox}>
                                      <p
                                        style={{
                                          margin: "auto",
                                          textAlign: "center",
                                          fontSize: "16px",
                                          padding: "10px",
                                        }}
                                      >
                                        <span
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={() => {
                                            history.push("/sign-up");
                                          }}
                                          style={{ fontWeight: "500" }}
                                        >
                                          Sign up
                                        </span>{" "}
                                        /{" "}
                                        <span
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={() => {
                                            dispatch(
                                              toggleLogInPopUp(
                                                !logInPopUpState.show
                                              )
                                            );
                                          }}
                                          style={{ fontWeight: "500" }}
                                        >
                                          log in
                                        </span>{" "}
                                        to{" "}
                                        <span style={{ fontWeight: "500" }}>
                                          place{" "}
                                        </span>
                                        an{" "}
                                        <span style={{ fontWeight: "500" }}>
                                          order
                                        </span>
                                        .
                                      </p>
                                    </div>
                                  ) : authState.emailVerified ? (
                                    <>
                                      {showCarUnavailableMessage && (
                                        <div
                                          className={
                                            Styles.CartNotFullAvailable
                                          }
                                        >
                                          <p>
                                            Some cart items are not available.
                                          </p>
                                        </div>
                                      )}

                                      <CustomButton
                                        disabled={!canPlaceOrder()}
                                        label="Place Order"
                                        styles={{
                                          backgroundColor: "#18723A",
                                          color: "white",
                                          margin: "10px auto",
                                          width: "80%",
                                          textAlign: "center",
                                        }}
                                        onClick={() => {
                                          //Push To Shipping
                                          if (canPlaceOrder()) {
                                            history.push("/shipping");
                                            history.push({
                                              pathname: "/shipping",
                                              state: {
                                                cameFromCart: true,
                                              },
                                            });
                                          } else {
                                            setShowCarUnavailableMessage(true);
                                          }
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <div className={Styles.VerifiyEmailBox}>
                                        <p
                                          style={{
                                            margin: "auto",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          Please
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            verify your email address{" "}
                                          </span>
                                          to
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            place{" "}
                                          </span>
                                          an
                                          <span style={{ fontWeight: "500" }}>
                                            {" "}
                                            order
                                          </span>
                                          .
                                        </p>
                                        <p
                                          className={
                                            Styles.RequestVerificationText
                                          }
                                          onClick={async () => {
                                            setRequestVerEmailState(null);
                                            setLoadingRequest(true);
                                            var sendEmailVerificationEmailResult =
                                              await sendEmailVerificationEmail();

                                            if (
                                              sendEmailVerificationEmailResult.ok
                                            ) {
                                              setLoadingRequest(false);
                                              setRequestVerEmailState({
                                                ok: true,
                                              });
                                            } else {
                                              setLoadingRequest(false);
                                              setRequestVerEmailState({
                                                ok: false,
                                              });
                                            }
                                          }}
                                          style={{
                                            fontWeight: "500",
                                            color: "blue",
                                            margin: "auto",
                                            textAlign: "center",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          {" "}
                                          Request Verification Email
                                        </p>
                                        {loadingRequest && (
                                          <div
                                            style={{
                                              alignContent: "center",
                                              display: "flex",
                                            }}
                                          >
                                            <CircularProgress
                                              size={20}
                                              style={{ margin: "0px auto" }}
                                            />
                                          </div>
                                        )}
                                        {requestVerEmailState &&
                                          (requestVerEmailState.ok ? (
                                            <p
                                              style={{
                                                fontWeight: "400",
                                                color: "green",
                                                margin: "auto",
                                                textAlign: "center",
                                                fontSize: "18px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {" "}
                                              Sent
                                            </p>
                                          ) : (
                                            <p
                                              style={{
                                                fontWeight: "400",
                                                color: "red",
                                                margin: "auto",
                                                textAlign: "center",
                                                fontSize: "18px",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {" "}
                                              Failed
                                            </p>
                                          ))}
                                      </div>
                                    </>
                                  )}
                                  <CustomButton
                                    label="Continue Shopping"
                                    styles={{
                                      backgroundColor: "#38CCCC",
                                      margin: "20px auto",
                                      width: "80%",
                                      textAlign: "center",
                                    }}
                                    onClick={() => {
                                      history.push("/");
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className={Styles.EmptyCartBanner}>
                                <p>Your shopping cart is empty.</p>
                                <CustomButton
                                  label="Continue Shopping"
                                  styles={{
                                    backgroundColor: "#38CCCC",
                                    margin: "20px auto",

                                    textAlign: "center",
                                  }}
                                  onClick={() => {
                                    history.push("/");
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className={Styles.EmptyCartBanner}>
                          <span
                            class="material-icons"
                            style={{ color: "red", fontSize: "45px" }}
                          >
                            error
                          </span>
                          <p>{shoppingCart.error}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ShoppingCartPage;

//the div rendered when cart is empty
function emptyCard() {
  return <div>Empty Cart</div>;
}
