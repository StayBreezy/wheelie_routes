import React from 'react'
import { connect } from 'react-redux'

export const Filter = (props) => {
    return (
        <div>
            <h3>filter</h3>
            <button>radio button</button>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
