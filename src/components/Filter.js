import React from 'react'
import { connect } from 'react-redux'
import '../App.css';


export const Filter = (props) => {
    return (
        <div className="filter">
            <h3>filter&search</h3>
            <input></input>
            <div>
                <p>water</p>
                <button>yes</button>
                <button>no</button>
            </div>
            <div>
                <p>shops</p>
                <button>yes</button>
                <button>no</button>
            </div>
            <div>
                <p>water</p>
                <button>yes</button>
                <button>no</button>
            </div>
            <div>
                <p>water</p>
                <button>yes</button>
                <button>no</button>
            </div>
            <div>
                <p>water</p>
                <button>yes</button>
                <button>no</button>
            </div>
            <button>Clear Search</button>
            <button>Search</button>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
