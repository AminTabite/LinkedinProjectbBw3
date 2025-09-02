import { Container, Row, Col } from "react-bootstrap"
import ColonnaDxHome from "./ColonnaDxHome"
import ColonnaSxHome from "./colonnaSxHome"
import MiniFooter from "./MiniFooter"

const HomePage = () => {
    return (
        <div style={{paddingTop: "7em"}}>
        <Container>
        <Row>
          <Col xs= {0} md= {3}>
          <ColonnaSxHome />
          </Col>
          <Col xs= {12} md ={6}></Col>
          <Col xs= {0} md= {3}>
          <ColonnaDxHome /> 
          <MiniFooter />
          </Col>
        </Row>
        </Container>
      </div>
    )
}

export default HomePage