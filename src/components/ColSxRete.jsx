import { Row, Col, Container } from "react-bootstrap";

import(Row);

const ColSxRete = () => {
  return (
    <Container className="">
      <Row>
        <Col>
          <div className="d-flex flex-xl-column rounded-4 bg-white">
            <div className="border-bottom">
              <h6 className="ps-2">Gestisci la tua rete</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {" "}
              {/*elemento singolo*/}
              <div className="d-flex align-items-center p-2">
                <i className="bi bi-people m-1 pb-1"></i>
                <h6 className="ps-2">Collegamenti</h6>
              </div>
              <div className="pe-4">
                <p>69</p>
              </div>
            </div>
            {/* elemento singolo fine*/}
            <div className="d-flex justify-content-start align-items-center p-2">
              {" "}
              {/*elemento singolo*/}
              <i className="bi bi-person m-1 pb-1"></i>
              <h6 className="ps-2">Persone che segui e followers</h6>
            </div>
            <div className="d-flex justify-content-start align-items-center p-2">
              {" "}
              {/*elemento singolo*/}
              <i className="bi bi-person-plus m-1 pb-1"></i>
              <h6 className="ps-2">Gruppi</h6>
            </div>
            <div className="d-flex justify-content-start align-items-center p-2">
              {" "}
              {/*elemento singolo*/}
              <i className="bi bi-building m-1 pb-1"></i>
              <h6 className="ps-2">Eventi</h6>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {" "}
              {/*elemento singolo*/}
              <div className="d-flex align-items-center p-2">
                <i className="bi bi-building m-1 pb-1"></i>
                <h6 className="ps-2">Pagine</h6>
              </div>
              <div className="pe-4">
                <p>13</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {" "}
              {/* elemento singolo fine*/}
              <div className="d-flex align-items-center p-2">
                <i className="bi bi-newspaper m-1 pb-1"></i>
                <h6 className="ps-2">Newsletter</h6>
              </div>
              <div className="pe-4">
                <p>1</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColSxRete;
