import React, { Component } from 'react';
import{FaTimes} from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
    render() {
        return (
            <div className="appointment-list item-list mb-3">
                {this.props.apts.map(apt =>(
                    <div className="pet-item col media py-3" key={apt.aptId}>
                        <div className="mr-3">
                            <button className="pet-delete btn btn-sm btn-danger"
                                onClick={() => this.props.deleteApt(apt)}
                            >
                                <FaTimes />
                            </button>
                        </div>
            
                        <div className="pet-info media-body">
                            <div className="pet-head d-flex">
                                <span className="pet-name"
                                        contentEditable="true"
                                        suppressContentEditableWarning
                                        onBlur={e =>
                                            this.props.updateInfo(
                                            'petName',
                                            e.target.innerText,
                                            apt.aptId
                                            )
                                        }>{apt.petName}</span>
                                <span className="apt-date ml-auto">
                                    <Moment
                                    date={apt.aptDate}
                                    parse="YYYY-MM-dd hh:mm"
                                    format="MMM-D"
                                    />
                                </span>
                            </div>
            
                            <div className="owner-name">
                            <span className="label-item">Owner: </span>
                            <span>{apt.ownerName}</span>
                            </div>
                            <div className="apt-notes">{apt.aptNotes}</div>
                        </div>
                    </div>                    
                ))}
            </div>
        );
    }
}

export default ListAppointments;