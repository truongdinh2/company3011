import { Button } from '@material-ui/core';
import { Col, Row } from 'antd';
import React from 'react';

function Sider(props) {
    // const {name} = useParams();
    // console.log(useParams())
    return (
        <div className="sid">
            <Row>
                <Col>
                    <Button className="btnS">
                        Home 
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="btnS">
                        Profile
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="btnS">
                        Setting
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Sider;