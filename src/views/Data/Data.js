import React, { Component } from 'react';
import { 
  Button,
  Card, 
  CardBody, 
  CardHeader, 
  Col,
  Collapse,
  Row,
  Fade, 
  FormGroup,
  Modal, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { getData, deleteData } from '../../store/data/actions';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Tables extends Component {
  constructor(props){
    super(props);
    this.state = { 
        modal: false,
        collapse: true,
        fadeIn: true,
        timeout: 300
    }
    this.toggle = this.toggle.bind(this);
    this.toggling = this.toggling.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  toggle(){
    this.setState({ modal: !this.state.modal });
  };

  toggling(){
    this.setState({ collapse: !this.state.collapse });
  };

  toggleFade(){
    this.setState((prevState) => { return { fadeIn: !prevState } });
  };

  handleDelete(event, id){
    event.preventDefault();
    console.log(id)
    swal({
      title: 'Apakah Anda Yakin?',
      text: 'Ingin menghapus data ini?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if(willDelete){
        swal(
          'Deleted!', "Data Berhasil Dihapus", 
          { icon: "success" }
        )
        .then(
          this.props.dispatch(deleteData(id))
        )
        this.props.history.push('/');
        this.props.history.push('/data');
      }else{
        swal('Data tidak jadi dihapus')
      }
    });
  }
  
  async componentDidMount(){
    this.forceUpdate();  
    await this.props.dispatch(getData());
  }

  render() {
    const { error, loading, data } = this.props;
    
    if(error){
        return <div> Error! {error.message} </div>;
    }

    if(loading){
        return <div>Loading...</div>;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Data
                  <div className="card-header-actions">
                    <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggling}><i className="icon-arrow-up"></i></Button>
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12">
                        <FormGroup row>
                          <Col xs="12" md="5">
                            <Link to="/data/tambah-data">
                                <Button color="primary" size="md">  
                                    <i className="icon-plus"> Tambah </i> 
                                </Button>
                            </Link> 
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                              <ModalHeader toggle={this.toggle}> Tambah Refund </ModalHeader>
                              <ModalBody>
                                <Row>
                                  <Col xs="12" sm="12">
                                    <FormGroup row>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Label htmlFor="input2-group2">No. Kontrak</Label>
                                        </InputGroup>
                                      </Col>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Input type="text" id="input2-group2" name="input2-group2" placeholder="Search" />
                                          <InputGroupAddon addonType="append">
                                            <Button type="button" color="primary">Search</Button>
                                          </InputGroupAddon>
                                        </InputGroup>
                                      </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Label htmlFor="tanggalRefund"> Tanggal Refund </Label>
                                        </InputGroup>  
                                      </Col>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Input type="date" id="tanggalRefund" name="date-inputs" placeholder="date" />
                                        </InputGroup>  
                                      </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Label htmlFor="keteranganRefund"> Keterangan Refund </Label>
                                        </InputGroup>  
                                      </Col>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Input type="text" id="keteranganRefund" name="keteranganRefunds" placeholder="Keterangan" />
                                        </InputGroup>  
                                      </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Label htmlFor="attachFile"> Attach File </Label>
                                        </InputGroup>  
                                      </Col>
                                      <Col xs="12" md="12">
                                        <InputGroup>
                                          <Input type="file" id="attachFile" name="attachFiles" />
                                        </InputGroup>  
                                      </Col>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                              </ModalFooter>
                            </Modal>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <ReactTable
                      data={data.map((prop, id) => {
                        return{
                          first_name: prop.first_name,
                          last_name: prop.last_name,
                          email: prop.email,
                          gender: prop.gender,
                          ip_address: prop.ip_address,
                          size: prop.size,
                          title: prop.title,
                          actions: (
                            <div>
                              <Link to={"/data/edit-data/" + prop.id}>
                                <Button 
                                  color="primary" 
                                  size="sm"
                                > 
                                  <i className="icon-pencil"> </i> 
                                </Button>
                              </Link>
                              &nbsp;&nbsp;
                              <Button 
                                color="danger" 
                                size="sm"
                                onClick={(event) => { this.handleDelete(event, prop.id) }}
                              > 
                                <i className="icon-trash"> </i> 
                              </Button>
                            </div>
                          )
                        }
                      })}
                      filterable
                      columns={[
                        {
                          Header: "First Name",
                          accessor: "first_name",
                          width: 150
                        },
                        {
                          Header: "Last Name",
                          accessor: "last_name",
                          width: 150
                        },
                        {
                          Header: "Email",
                          accessor: "email",
                          width: 250
                        },
                        {
                          Header: "Gender",
                          accessor: "gender",
                          width: 100
                        },
                        {
                          Header: "Ip Address",
                          accessor: "ip_address",
                          width: 150
                        },
                        {
                          Header: "Size",
                          accessor: "size",
                          width: 80
                        },
                        {
                          Header: "Title",
                          accessor: "title",
                          width: 80
                        },
                        {
                          accessor: "actions",
                          sortable: false,
                          filterable: false,
                          width: 80
                        }
                      ]}
                      defaultPageSize={5}
                      showPaginationBottom={true}
                      className="-striped -highlight"
                    />
                  </CardBody>
                </Collapse>
              </Card>
            </Fade>
          </Col>
        </Row>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return{
    data: state.data.items,
    loading: state.loading,
    error: state.error
  }
};

export default connect(mapStateToProps)(Tables);
