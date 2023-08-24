import { Col, Portlet, Nav, Row, Tab, Button, Form, InputGroup} from '@blueupcode/components'
import axios from 'axios'
import { swal, toast } from 'components/sweetalert2/instance'
import { parseCookies } from 'nookies'
import React from 'react'
import { Admin_Client_ADD, Admin_Client_Field_GetAll, Admin_Client_Group_GetAll, Admin_Currency_GetAll } from 'utils/adminUrl'
import countries from 'utils/country'

const NewOne = () => {
    
    const cookies = parseCookies()
    const headers = {"Authorization": cookies.admintoken}
    
    const [newOne, setNewOne] = React.useState({})

    const [company, setCompany] = React.useState('')
    const [phonenumber, setPhonenumber] = React.useState('')
    const [website, setWebsite] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [city, setCity] = React.useState('')
    const [default_language, setDefault_language] = React.useState('none')
    const [state, setState] = React.useState('')
    const [zip, setZip] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [default_currency, setDefault_currency] = React.useState('')
    const [groups, setGroups] = React.useState<String[]>([])
    const [billing_street, setBilling_street] = React.useState('')
    const [billing_city, setBilling_city] = React.useState('')
    const [billing_state, setBilling_state] = React.useState('')
    const [billing_zip, setBilling_zip] = React.useState('')
    const [billing_country, setBilling_country] = React.useState('')
    const [shipping_street, setShipping_street] = React.useState('')
    const [shipping_city, setShipping_city] = React.useState('')
    const [shipping_state, setShipping_state] = React.useState('')
    const [shipping_zip, setShipping_zip] = React.useState('')
    const [shipping_country, setShipping_country] = React.useState('')
    interface Fieldvalues {
        field: any,
        value: any
    }
    const [fieldvalues, setFieldvalues] = React.useState<Fieldvalues[]>([])
    const [changefieldvalues, setChangefieldvalues] = React.useState(0.001)


    const [currencies, setCurrencies] = React.useState([])
    const [allGroups, setAllGroups] = React.useState([])
    const [fields, setFields] = React.useState([])

    React.useEffect(() => {
        axios.get(Admin_Currency_GetAll + `/1/0`, {headers})
            .then(res => {
                setCurrencies(res.data.all)
                setDefault_currency(res.data.all[0]._id)
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Client_Group_GetAll + `/1/0`, {headers})
        .then(res => {
            setAllGroups(res.data.all)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    React.useEffect(() => {
        axios.get(Admin_Client_Field_GetAll + `/1/0`, {headers})
            .then(res => {
                setFields(res.data.all)
            })
            .catch(err => console.log(err))
    }, [])
    
    React.useEffect(() => {
        setNewOne({company, phonenumber, billing_street, billing_city, billing_state, billing_zip, billing_country, shipping_street, shipping_city, shipping_state, shipping_zip, shipping_country, website, default_currency, country, city, default_language, groups, state, zip, fieldvalues, address})
    }, [company, phonenumber, billing_street, billing_city, billing_state, billing_zip, billing_country, shipping_street, shipping_city, shipping_state, shipping_zip, shipping_country, website, country, city, default_currency, default_language, state, zip, groups.length, changefieldvalues, address])

    const successAlert = () => {
        toast.fire({
            icon: 'success',
            title: 'Success!'
        })
    }

    const change = (e: any) => {
        let group = groups
        if(group.indexOf(e.target.name) > -1) { group.splice(group.indexOf(e.target.name), 1) }
        else{group.push(e.target.name)}
        setGroups(group) 
    }
    
    const handleSubmit = async () => {
        await axios.post(Admin_Client_ADD, newOne, {headers})
            .then(res => {
                successAlert()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleValues = (e: any) => {
        const copy = fieldvalues
        const length = fieldvalues.length + 1
        const bool = []
        for(let i = 0; i < length; i ++){
            if(copy[i] === undefined && i == 0)
            {
                bool.push("pushed")
                copy.push({field: e.target.name, value: e.target.value})
            }else{
                if (copy[i] !== undefined)
                {
                    if(copy[i].field == e.target.name)
                    {
                        copy[i].value = e.target.value
                        bool.push("changed")
                    }
                }
            }
        }
        if(bool.length == 0){
            copy.push({field: e.target.name, value: e.target.value})
        }
        setFieldvalues(copy)
        setChangefieldvalues(Math.random())
    }

    return(
        <Row>
            <Col md = "12">
                <Tab.Container defaultActiveKey="customerdetails">
                    <Portlet>
                        <Portlet.Header bordered>
                            <Portlet.Addon>
                                {/* BEGIN Nav */}
                                <Nav variant="lines" portlet>
                                    <Nav.Item>
                                        <Nav.Link eventKey="customerdetails">Customer Details</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="customfields">Custom Field</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="billingshipping">Billing & Shipping</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                {/* END Nav */}
                            </Portlet.Addon>
                        </Portlet.Header>
                        <Portlet.Body>
                            {/* BEGIN Tabs */}
                            <Tab.Content>
                                <Tab.Pane eventKey="customerdetails">
                                    <Portlet>
                                        <Portlet.Body>
                                            <Row>
                                                <Col md="2">
                                                </Col>
                                                <Col md="8">
                                                    <div className="d-grid gap-3">
                                                        <Form.Group controlId="companyID">
                                                            <Form.Label>*Company</Form.Label>
                                                            <Form.Control onChange={(e) => setCompany(e.target.value)} type="text" size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="phonenumberID">
                                                            <Form.Label>*Phone Number</Form.Label>
                                                            <Form.Control onChange={(e) => setPhonenumber(e.target.value)} type="text" size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="websiteID">
                                                            <Form.Label>*Website</Form.Label>
                                                            <Form.Control onChange={(e) => setWebsite(e.target.value)}  type="text"  size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="groupsID">
                                                            <p>* Groups</p>
                                                            {
                                                                allGroups.map((allGroup: any) => (
                                                                    <Form.Check 
                                                                        type="checkbox" 
                                                                        key={allGroup._id} 
                                                                        id = {allGroup._id} 
                                                                        name = {allGroup.name} 
                                                                        label={allGroup.name} 
                                                                        onChange={(e) => change(e)}
                                                                    />
                                                                ))
                                                            }
                                                        </Form.Group>
                                                        <Row>
                                                            <Col>
                                                                <Form.Group controlId="currencyID">
                                                                    <Form.Label>*Currency</Form.Label>
                                                                    <Form.Select onChange={(e) => setDefault_currency(e.target.value)} size="lg">
                                                                        {
                                                                            currencies.map((currencyValue: any) =>(
                                                                                <option key={currencyValue._id} value={currencyValue._id}>{currencyValue.name}{currencyValue.symbol}</option>
                                                                            ))
                                                                        }
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col>
                                                            <Form.Group controlId="defaultlangID">
                                                                <Form.Label>*Default Language</Form.Label>
                                                                <Form.Select onChange={(e) => setDefault_language(e.target.value)} defaultValue="none" size="lg">
                                                                    <option value="none">System Default</option>
                                                                    <option value="English">English</option>
                                                                    <option value="Germany">Germany</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                            </Col>
                                                        </Row>
                                                        <Form.Group controlId="addressID">
                                                            <Form.Label>*Address</Form.Label>
                                                            <Form.Control onChange={(e) => setAddress(e.target.value)} as="textarea" rows={3}/>
                                                        </Form.Group>
                                                        <Form.Group controlId="cityID">
                                                            <Form.Label>*City</Form.Label>
                                                            <Form.Control onChange={(e) => setCity(e.target.value)}  type="text"  size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="stateID">
                                                            <Form.Label>*State</Form.Label>
                                                            <Form.Control onChange={(e) => setState(e.target.value)}  type="text"  size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="zipID">
                                                            <Form.Label>*Zip Code</Form.Label>
                                                            <Form.Control onChange={(e) => setZip(e.target.value)}  type="text"  size = 'lg'/>
                                                        </Form.Group>
                                                        <Form.Group controlId="countryID">
                                                            <Form.Label>*Country</Form.Label>
                                                            <Form.Select onChange={(e) => setCountry(e.target.value)}  size="lg">
                                                                {
                                                                    countries.map((country) => (
                                                                        <option key={country.code} value={country.name}>{country.name}</option>
                                                                    ))
                                                                }
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </div>
                                                </Col>
                                                <Col md="2">
                                                    
                                                </Col>
                                            </Row>
                                        </Portlet.Body>
                                    </Portlet>
                                </Tab.Pane>
                                <Tab.Pane eventKey="customfields">
                                    <Portlet>
                                        <Portlet.Body>
                                            <Row>
                                                <Col md="2">
                                                </Col>
                                                <Col md="8">
                                                    <div className="d-grid gap-3">
                                                    {
                                                        fields.map((field: any) => (
                                                            <Form.Group key={field._id} controlId={field._id}>
                                                                <Form.Label>{field.name}</Form.Label>
                                                                <Form.Control name={field._id} onChange={(e) => handleValues(e)}  type="text" size = 'lg'/>
                                                            </Form.Group>   
                                                        ))
                                                    }
                                                    </div>
                                                </Col>
                                                <Col md="2">
                                                    
                                                </Col>
                                            </Row>
                                        </Portlet.Body>
                                    </Portlet>
                                </Tab.Pane>
                                <Tab.Pane eventKey="billingshipping">
                                    <Row>
                                        <Col md="1">
                                        </Col>
                                        <Col md="5">
                                            <h5>*Billing Address</h5>
                                            <Form.Group controlId="bistreetID">
                                                <Form.Label>*Street</Form.Label>
                                                <Form.Control onChange={(e) => setBilling_street(e.target.value)} as="textarea" rows={3}/>
                                            </Form.Group>
                                            <Form.Group controlId="bicityID">
                                                <Form.Label>*city</Form.Label>
                                                <Form.Control onChange={(e) => setBilling_city(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>
                                            <Form.Group controlId="bistateID">
                                                <Form.Label>*State</Form.Label>
                                                <Form.Control onChange={(e) => setBilling_state(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>
                                            <Form.Group controlId="bizipcodeID">
                                                <Form.Label>*Zip Code</Form.Label>
                                                <Form.Control onChange={(e) => setBilling_zip(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>             
                                            <Form.Group controlId="bicountryID">
                                                <Form.Label>*Country</Form.Label>
                                                <Form.Select onChange={(e) => setBilling_country(e.target.value)}  size="lg">
                                                    {
                                                        countries.map((country) => (
                                                            <option key={country.code} value={country.name}>{country.name}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>   
                                        </Col>
                                        <Col md="5">
                                            <h5>*Shipping Address</h5>
                                            <Form.Group controlId="shstreetID">
                                                <Form.Label>*Street</Form.Label>
                                                <Form.Control onChange={(e) => setShipping_street(e.target.value)} as="textarea" rows={3}/>
                                            </Form.Group>
                                            <Form.Group controlId="shcityID">
                                                <Form.Label>*city</Form.Label>
                                                <Form.Control onChange={(e) => setShipping_city(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>
                                            <Form.Group controlId="shstateID">
                                                <Form.Label>*State</Form.Label>
                                                <Form.Control onChange={(e) => setShipping_state(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>
                                            <Form.Group controlId="shzipcodeID">
                                                <Form.Label>*Zip Code</Form.Label>
                                                <Form.Control onChange={(e) => setShipping_zip(e.target.value)} type='text' size = 'lg'/>
                                            </Form.Group>             
                                            <Form.Group controlId="shcountryID">
                                                <Form.Label>*Country</Form.Label>
                                                <Form.Select onChange={(e) => setShipping_country(e.target.value)}  size="lg">
                                                    {
                                                        countries.map((country) => (
                                                            <option key={country.code} value={country.name}>{country.name}</option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md="1">
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                            {/* END Tabs */}
                        </Portlet.Body>
                        <Portlet.Footer bordered align="end">
                            <Button onClick={handleSubmit} type='submit' variant="primary">Submit</Button>
                        </Portlet.Footer>
                    </Portlet>
                </Tab.Container>
            </Col>
        </Row>
    )
}

export default NewOne
