import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Constants from '../../constants';

const CardComponent = (props) => {
    const {filteredArray} = props;
    const {provider, universities, subject, childSubject, nextSessionDate, courseLink, videoLink, length} = Constants;
    return (
        <React.Fragment>
        <Row>
            {filteredArray.map((data,index) => {
                return(
                    <Col md={4} xs={12} key={index}>
                        <Card border="secondary" className="custom-card-style">
                            <Card.Header><b>Course : </b>{data['Course Name']}</Card.Header>
                            <Card.Body>
                                <Card.Title>{provider} {data.Provider}</Card.Title>
                                <Card.Text><i>{universities} </i>{data.Universities.Institutions}</Card.Text>
                                <Card.Text><i>{subject} </i>{data['Parent Subject']}</Card.Text>
                                <Card.Text><i>{childSubject} </i>{data['Child Subject']}</Card.Text>
                                <Card.Text><i>{nextSessionDate} </i>{data['Next Session Date']}</Card.Text>
                                <Card.Text><i>{length}</i>{data.Length}</Card.Text>
                                <Card.Link href={data.Url}>{courseLink}</Card.Link>
                                <Card.Link href={data['Video(Url)']}>{videoLink}</Card.Link>
                            </Card.Body>
                        </Card>
                </Col>
                );
            })}
            
        </Row>
        </React.Fragment>       
    );
};
export default CardComponent;


