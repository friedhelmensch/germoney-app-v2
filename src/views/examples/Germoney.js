/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter";

const calculateCosts = (event, priceInEth) => {
  event.preventDefault();
  const amountAsText = event.target.value;
  const cleaned = amountAsText.replace(",", ".");
  const desiredAmount = parseFloat(cleaned);
  if (Number.isNaN(desiredAmount)) {
    return 0;
  }
  const etherToPay = desiredAmount * priceInEth;
  return etherToPay;
};

const sectionWithoutWeb3 = (
  <div className="section">
    {"Please use a web3 enabled browser or add-on to buy Germoney."}
    <br></br>
    <Button
      block
      className="btn-icon mb-3 mb-sm-0"
      color="default"
      href="https://metamask.io/"
      target="_blank"
    >
      <span className="btn-inner--text">Meta Mask</span>
    </Button>
    <Button
      block
      className="btn-icon mb-3 mb-sm-0"
      href="https://trustwallet.com/"
      target="_blank"
    >
      <span className="btn-inner--text">Trust wallet (mobile)</span>
    </Button>
    <Button
      block
      className="btn-icon mb-3 mb-sm-0"
      color="info"
      href="https://status.im/"
      target="_blank"
    >
      <span className="btn-inner--text">Status.im (mobile)</span>
    </Button>{" "}
  </div>
);

class Germoney extends React.Component {
  state = {
    priceInEth: 0,
    totalSupply: 0,
    balance: 0,
    total: 0,
    holder: 0,
  };

  constructor(props) {
    super(props);

    this.buyGermoney = this.buyGermoney.bind(this);
  }

  async componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;

    const priceInWei = await this.props.contract.price();

    console.log(priceInWei.toString());

    const supplyWithDecimals = await this.props.contract.totalSupply();

    const balance = await this.props.contract.balanceOf(this.props.account);

    const realBalance = balance / 100;
    const totalSupply = supplyWithDecimals / 100;
    const priceInEth =
      this.props.utils.fromWei(priceInWei.toString(), "ether") * 100;

    const apiKey = process.env.REACT_APP_APIKEY;
    const { address } = "0x0"; //this.props.drizzle.contracts.Germoney;
    /*
    const response = await fetch(
      `https://api.bloxy.info/token/token_stat?token=${address}&key=${apiKey}&format=structure`
    );

    const result = await response.json();
    const holders = result[0].holders_count;
    */

    console.log(realBalance);

    const holders = 5;
    this.setState({
      priceInEth: priceInEth,
      totalSupply: totalSupply,
      balance: realBalance,
      holders: holders,
    });
  }

  async buyGermoney(event) {
    event.preventDefault();
    console.log("Buy");
    const weiToPay = this.props.utils.toWei(
      this.state.total.toString(),
      "ether"
    );
    try {
      await this.props.contract.buy({
        value: weiToPay,
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white">
                        Germoney{" "}
                        <span>
                          All about a very important token in the{" "}
                          <s>Ethereum</s> Pulse ecosystem.
                        </span>
                      </h1>
                      <div className="btn-wrapper">
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          href="https://etherscan.io/address/0x844Af22fBEC4D1bb9C062F33D29e4Ad8d0EFc01D"
                          target="_blank"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="fa fa-code" />
                          </span>
                          <span className="btn-inner--text">
                            Germoney on Etherscan
                          </span>
                        </Button>
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                          color="default"
                          href="#buy"
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-cloud-download-95" />
                          </span>
                          <span className="btn-inner--text">Buy Germoney</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            {/* 1st Hero Variation */}
          </div>
          <section className="section section-lg pt-lg-0 mt--200"></section>
          <section className="section section-lg">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/theme/logo.png")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-settings-gear-65" />
                    </div>
                    <h3>Germoney in numbers</h3>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-settings-gear-65" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Total supply limited to{" "}
                              {this.state.totalSupply
                                ? this.state.totalSupply.toLocaleString("en")
                                : -1}{" "}
                              GER
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-html5" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Initial price fixed to 0.0030075993 PLS/GER
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-satisfied" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              {this.state.holders} Holders so far.
                            </h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section bg-secondary">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="6">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1200x1000.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        History of Germoney
                      </h4>
                      <p className="lead text-italic text-white">
                        Germoney represents the old currency of Germany. The
                        D-Mark. Therefore the total supply equals the remaining
                        D-Mark existing in circulation. The price of Germoney
                        reflects the price of a D-Mark in relation to Ether. On
                        the day of contract deployment 1 GER was exactly worth 1
                        D-Mark.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
                <Col md="6">
                  <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                      <i className="ni ni-settings" />
                    </div>
                    <h3>Tokenomics</h3>
                    <p className="lead">
                      Germoney is minted by sending ether. No single entitiy can
                      have an impact on the quantity or price. When all Germoney
                      is minted it will get scarce as no new tokens will ever be
                      created afterwards.
                    </p>
                    <a
                      className="font-weight-bold text-warning mt-5"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      100% decentralized.
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section pb-0 bg-gradient-warning">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-lg-2 ml-lg-auto" md="6">
                  <div className="position-relative pl-md-5">
                    <img
                      alt="..."
                      className="img-center img-fluid"
                      src={require("assets/img/ill/ill-2.svg")}
                    />
                  </div>
                </Col>
                <Col className="order-lg-1" lg="6">
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i className="ni ni-building text-primary" />
                      </div>
                    </div>
                    <div className="pl-4" id="buy">
                      <h4 className="display-3 text-white">
                        Get in before it´s too late.
                      </h4>
                      <p className="text-white">
                        As simple as clicking a button.
                      </p>
                    </div>
                  </div>
                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3">
                        <div>
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-satisfied" />
                          </div>
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">Buy Germoney</h5>
                          <p className="mt-0">
                            Enter the amount of Germoney you want to buy.
                          </p>
                          <FormGroup
                            className={classnames("mt-5", {
                              focused: this.state.nameFocused,
                            })}
                          >
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-user-run" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Amount of germoney"
                                type="text"
                                onFocus={(e) =>
                                  this.setState({ nameFocused: true })
                                }
                                onBlur={(e) =>
                                  this.setState({ nameFocused: false })
                                }
                                onChange={(e) => {
                                  const costs = calculateCosts(
                                    e,
                                    this.state.priceInEth
                                  );
                                  this.setState({ total: costs });
                                }}
                              />
                            </InputGroup>
                          </FormGroup>
                          <p className="mt-0">Price: {this.state.total} PLS</p>
                          {window.ethereum ? (
                            <div>
                              <Button
                                block
                                className="btn-round"
                                color="default"
                                size="lg"
                                type="button"
                                onClick={this.buyGermoney}
                              >
                                Buy Now
                              </Button>
                            </div>
                          ) : (
                            sectionWithoutWeb3
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section section-lg">
            <Container>
              <Row className="justify-content-center text-center mb-lg">
                <Col lg="8">
                  <h2 className="display-3">The Germoney Team</h2>
                </Col>
              </Row>
              <Row>
                <Col className="mb-5 mb-lg-0">
                  <div className="px-4">
                    <img
                      alt="..."
                      className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                      src={require("assets/img/theme/friedhelm.jpeg")}
                      style={{ width: "200px" }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">Friedhelm</span>
                        <small className="h6 text-muted">Developer</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-facebook" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fa fa-dribbble" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default Germoney;
