import React from 'react'

export default function Profile() {
    return (
        <div>
            <Header />
            <section>
                <h1>{user.name}</h1>
                <h2>Routes</h2>
                {/* {map over users routes} */}
            </section>
        </div>
    )
}
