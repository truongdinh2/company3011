import { Button } from '@material-ui/core';
import { Col, Row } from 'antd';
import React,{useState} from 'react';

function Sider(props) {
    return (
        <>
            <Row>
                <Col>
                    <Button>
                        Home
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>
                        Profile
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>
                        Setting
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Sider;