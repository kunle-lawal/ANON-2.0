import React from 'react'

const AboutMe = () => {
    return (
        <div className="about_me_container">
            <div className="about_me">
                <div className="header about"><h2>About Me</h2></div>

                <div className="content about">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus tempora consequuntur et, 
                        non eius unde iusto quaerat, necessitatibus 
                        odio quasi placeat quod qui quam, beatae est dolorem sunt repellat asperiores?
                    </p>
                </div>

                <div className="misc about">
                    <div className="settings"><i class="fas fa-cog"> Settings</i></div>
                    <div className="message"><i class="far fa-comments"> Messages</i></div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe