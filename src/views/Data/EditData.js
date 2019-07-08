import React, { Component } from 'react';
import { 
  Button,
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  FormGroup, 
  Input,
  InputGroup,
  Fade,
  Collapse,
  Form,
  Label,
} from 'reactstrap';
import swal from 'sweetalert';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDataById, updateData } from '../../store/data/actions';

class Tables extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300,
            redirect: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

  handleClick = event => {
    event.preventDefault();
    const { match : {params } } = this.props;

    let payload = {
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      gender: this.props.gender,
      ip_address: this.props.ip_address,
      size: this.props.size,
      title: this.props.title
    }
    this.props.dispatch(updateData(params.id, payload));
    swal({
      type: 'success',
      title: 'Berhasil Update Data',
      showConfirmButton: true,
    })
    .then(() => this.setState({ redirect: true }))
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  async componentDidMount(){
    const { match : {params } } = this.props;
    if(params.id){
      await this.props.dispatch(getDataById(params.id));
    }
  }

  render() {
    const { redirect } = this.state;

    if(redirect){
      return <Redirect to="/data" />
    }
        
    return (
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                <Card>
                  <CardHeader>
                    <i className="fa fa-edit"></i> Edit Data
                    <div className="card-header-actions">
                      <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
                      <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse} id="collapseExample">
                    {this.props.datas.map((prop, id) => {
                      return(
                      <CardBody key={id}>
                        <Form className="form-horizontal">
                          <Row>
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="prependedInput">First Name</Label>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input 
                                      id="prependedInput" 
                                      size="16" 
                                      type="text"
                                      defaultValue={prop.first_name}
                                      onChange={this.handleChange('first_name')}  
                                    />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="appendedInput">Last Name</Label>
                                <div className="controls">
                                  <InputGroup>
                                    <Input 
                                      id="appendedInput" 
                                      size="16" 
                                      type="text"
                                      defaultValue={prop.last_name}
                                      onChange={this.handleChange('last_name')} 
                                    />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="appendedPrependedInput">Email</Label>
                                <div className="controls">
                                  <InputGroup className="input-prepend">
                                    <Input 
                                      id="appendedPrependedInput" 
                                      size="16" 
                                      type="email"
                                      defaultValue={prop.email}
                                      onChange={this.handleChange('email')} 
                                    />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="appendedInputButton">Gender</Label>
                                <div className="controls">
                                  <InputGroup>
                                    <Input 
                                      type="select" 
                                      name="select" 
                                      id="select"
                                      defaultValue={prop.gender}
                                      onChange={this.handleChange('gender')}
                                    >
                                      <option value="0">Please select</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </Input>
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="appendedInputButtons"> IP Address </Label>
                                <div className="controls">
                                  <InputGroup>
                                    <Input 
                                      id="appendedInputButtons" 
                                      size="16" 
                                      type="text"
                                      defaultValue={prop.ip_address}
                                      onChange={this.handleChange('ipAddress')} 
                                    />
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="appendedInputButton">Size</Label>
                                <div className="controls">
                                  <InputGroup>
                                    <Input 
                                      type="select" 
                                      name="select" 
                                      id="select"
                                      defaultValue={prop.size}
                                      onChange={this.handleChange('size')}
                                    >
                                      <option value="0">Please select</option>
                                      <option value="S">S (Short)</option>
                                      <option value="M">M (Medium)</option>
                                      <option value="L">L (Large)</option>
                                      <option value="XL">XL (Xtra Large)</option>
                                    </Input>
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="appendedInputButton">Title</Label>
                                <div className="controls">
                                  <InputGroup>
                                    <Input 
                                      type="select" 
                                      name="select" 
                                      id="select"
                                      defaultValue={prop.title}
                                      onChange={this.handleChange('title')}
                                    >
                                      <option value="0">Please select</option>
                                      <option value="Dr">Dr (Doktor)</option>
                                      <option value="Mr">Mr (Mister)</option>
                                    </Input>
                                  </InputGroup>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <hr/>
                          <Row>
                            <Col xs="12">
                              <div className="form-actions" style={{ float: 'right' }}>
                                <Button 
                                  type="submit" 
                                  color="primary"
                                  onClick={this.handleClick}
                                >
                                  Save changes
                                </Button>
                                &nbsp;&nbsp;
                                <Link to="/data">
                                  <Button color="secondary">
                                    Cancel
                                  </Button>
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    )
                    })}
                  </Collapse>
                </Card>
              </Fade>
            </Col>
          </Row>
        </div>
    ); 
  }
}

const mapStateToProps = state => ({
    datas: state.data.items,
});

export default connect(mapStateToProps)(Tables);
