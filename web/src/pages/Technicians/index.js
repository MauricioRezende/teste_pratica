import React, { useState, useEffect } from 'react'
import { Alert, Button, Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ModalDelete from '../../components/ModalDelete'
import './style.css'

const baseURL = 'http://localhost:8090/api'

const Technicians = () => {
    const [data, setData] = useState([])
    const [trashList, setTrashList] = useState(true)
    const [visibleAlert, setVisibleAlert] = useState(false);

    const onDismiss = () => setVisibleAlert(false);

    useEffect(() => {
        axios
            .get(baseURL + '/technical')
            .then(res => {
                setData(res.data.filter(item => item.status !== 'deleted'))
            })
    }, [])

    const refresh = () => {
        axios
            .get(baseURL + '/technical')
            .then(res => {
                setData(res.data.filter(item => item.status !== 'deleted'))
                setVisibleAlert(true)
            })
    }

    const trash = () => {
        setTrashList(!trashList)
        axios
            .get(baseURL + '/technical')
            .then(res => {
                if(trashList){
                    setData(res.data.filter(item => item.status === 'deleted'))
                }else{
                    setData(res.data.filter(item => item.status !== 'deleted'))
                }
            })
    }

    return(
        <>
            <nav aria-label="breadcrumb" >
                <ol className="breadcrumb" style={{borderRadius: '5px'}}>
                    <li className="breadcrumb-item active">Technicians</li>
                </ol>
            </nav>

            <Row>
                <Col md={6}>
                    <Link to='/technician/new'><Button color='success'>New technician</Button></Link>
                </Col>
                <Col md={6} style={{textAlign: 'right'}}>
                     { !trashList && 
                        <Button color='secondary' className='col-auto' onClick={trash}>List actives</Button>
                    }
                    { trashList && 
                        <Button color='secondary' onClick={trash}>List deleted</Button>
                    }
                </Col>
            </Row>

            <br />

            <Alert color="success" isOpen={visibleAlert} toggle={onDismiss}>
                Technician successfully deleted!
            </Alert>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>E-mail</th>
                        <th scope='col'>Status</th>
                        { !trashList &&
                            <>
                                <th scope='col'>Deletion date</th>
                            </>
                        }
                        { trashList &&
                            <>
                                <th scope='col'></th>
                                <th scope='col'></th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(row => {
                            return(
                                <tr key={row.id}>
                                    <th>{row.id}</th>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    { !trashList &&
                                        <>
                                            <td>Deleted</td>
                                            <td>{
                                                    row.change_date.split('T')[0].split('-')[2] + '/' + 
                                                    row.change_date.split('T')[0].split('-')[1] + '/' + 
                                                    row.change_date.split('T')[0].split('-')[0]
                                                }
                                            </td>
                                        </>
                                    }
                                    { trashList &&
                                        <>  
                                            <td>{row.status}</td>
                                            <td style={{textAlign: 'center'}}><ModalDelete buttonLabel='Delete' id={row.id} technician={row.name} func={refresh}/></td>
                                            <td style={{textAlign: 'center'}}><Link to={`/technician/${row.id}`}><Button outline  color='info' size='sm'>View / Edit</Button></Link></td>
                                        </>
                                    }
                                </tr>
                            )
                        })
                    }
                    {
                        data.length === 0 &&
                        <tr>
                            <td colSpan='6'>No technician found.</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default Technicians