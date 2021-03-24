import React, { useState, useEffect } from 'react'
import { Container, Button, Col, Row, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseURL = 'http://localhost:8090/api'

const Technician = props => {
    const [form, setForm] = useState({})
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(true)
    const [errorsList, setErrorsList] = useState([])
    const [visibleAlert, setVisibleAlert] = useState(false);
    
    const onDismiss = () => setVisibleAlert(false);

    const errors = [];
    
    useEffect(() => {
        axios
            .get(baseURL + '/technician/' + props.match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data[0])                
            })
    },[edit])

    const handleEdit = () => {
        setEdit(!edit)
    }

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
                .put(baseURL + '/technician/' + props.match.params.id, form)
                .then(() => {
                    setEdit(true)
                    setVisibleAlert(true)
                })
        }        
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    return (
        <>
            <nav aria-label="breadcrumb" >
                <ol className="breadcrumb" style={{borderRadius: '5px'}}>
                    <li className="breadcrumb-item"><Link to='/'>Technicians</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{!edit && 'Edit'}{edit && 'View'}</li>
                </ol>
            </nav>

            { edit && 
                <Button color='info' onClick={handleEdit}>Edit</Button>
            }
            { !edit && 
                <Button color='info' onClick={handleEdit}>Cancel edit</Button>
            }

            <br /><br />

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

            {data.map(row => {
                return(
                    <Form key={row.id}>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="email" name="name" id="name" defaultValue={row.name} disabled={edit} onChange={onChange('name')}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="email">E-mail</Label>
                                <Input type="text" name="email" id="email" defaultValue={row.email} disabled={edit} onChange={onChange('email')}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label htmlFor="address">Address</Label>
                            <Input type="text" name="address" id="address" defaultValue={row.address} disabled={edit} onChange={onChange('address')}/>
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="telephone">Telephone</Label>
                                <Input type="text" name="telephone" id="telephone" defaultValue={row.telephone} disabled={edit} onChange={onChange('telephone')}/>
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label htmlFor="status">Status</Label>
                                <Input type="select" name="status" id="status" disabled={edit} onChange={onChange('status')}>
                                    <option>{''}</option>
                                    <option value='active' selected={row.status === 'active'}>Active</option>
                                    <option value='disabled' selected={row.status === 'disabled'}>Disabled</option>
                                </Input>
                            </FormGroup>
                            </Col>
                        </Row>
                        { !edit && 
                            <>
                                <Button color='success' onClick={save}>Save</Button>
                                {' '}
                            </>
                        }
                        <Link to='/'><Button color='secondary'>Cancel</Button></Link>
                        
                    </Form>
             )
            })}
        </>
    )
}

export default Technician