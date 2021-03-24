import React, { useState } from 'react'
import { Button, Col, Row, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseURL = 'http://localhost:8090/api'

const NewTechnician = () => {
    const [form, setForm] = useState({})
    const [alert, setAlert] = useState(false)
    const [errorsList, setErrorsList] = useState([])
    const [visibleAlert, setVisibleAlert] = useState(false);
    
    const onDismiss = () => setVisibleAlert(false);
    

    const errors = [];
      
    const save = () => {
        // name,telephone,email,address,status
        if(form.name === undefined || form.name === ''){
            errors.push('Fill in the name field')
        }
        if(form.telephone === undefined || form.telephone === ''){
            errors.push('Fill in the telephone field')
        }
        if(form.email === undefined || form.email === ''){
            errors.push('Fill in the email field')
        }
        if(form.address === undefined || form.address === ''){
            errors.push('Fill in the address field')
        }
        if(form.status === undefined || form.status === ''){
            errors.push('Fill in the status field')
        }
        setErrorsList(errors)

        if(errors.length === 0){
            axios
                .post(baseURL + '/technician', form)
                .then(() => {
                    setVisibleAlert(true)
                    setAlert(true)
                })
        }        
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }


    return(
        <>
            <nav aria-label="breadcrumb" >
                <ol class="breadcrumb" style={{borderRadius: '5px'}}>
                    <li class="breadcrumb-item"><Link to='/'>Technicians</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">New</li>
                </ol>
            </nav>

            {' '}

            <Alert  color="success" isOpen={visibleAlert} toggle={onDismiss} >
                Registered successfully!
            </Alert>

            {errorsList.length > 0 && 
                errorsList.map(erro => {
                    return(
                        <Alert  color="danger" key={erro}>
                            {erro}
                        </Alert >
                    )
                })
            }

            <Form>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="email" name="name" id="name" onChange={onChange('name')}/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="text" name="email" id="email" onChange={onChange('email')}/>
                    </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label htmlFor="address">Address</Label>
                    <Input type="text" name="address" id="address" onChange={onChange('address')}/>
                </FormGroup>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="telephone">Telephone</Label>
                        <Input type="text" name="telephone" id="telephone" onChange={onChange('telephone')}/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label htmlFor="status">Status</Label>
                        <Input type="select" name="status" id="status" onChange={onChange('status')}>
                            <option>{''}</option>
                            <option value='active'>Active</option>
                            <option value='disabled'>Disabled</option>
                        </Input>
                    </FormGroup>
                    </Col>
                </Row>
                <Button color='success' onClick={save}>Save</Button>
                {' '}
                {alert && 
                    <Link to='/'><Button color='secondary'>Return</Button></Link>
                }
                {!alert && 
                    <Link to='/'><Button color='secondary'>Cancel</Button></Link>
                }
            </Form>
        </>
    )
}

export default NewTechnician