import React from 'react'

class Modal extends React.Component {
  render() {

    return (


      <div id="credits" >
        <a href="#openModal" style={{fontSize: 40, color: 'yellow', paddingLeft: 75}}>Click to Join NewsFeed</a>
        <div id="openModal" className="modalDialog">
          <div>
            {/* below code for form*/}
            <form>
              <h3 style={{color: 'yellow'}}>Join NewsFeed</h3>
              First Name<br />
              <input type="text" name="firstname" /><br />
              Last Name<br />
              <input type="text" name="lastname" /><br />
              Email<br />
              <input type="text" name="email" /><br />
              Update Frequency<br />
               <a href="/api/auth/login/google"> <button>log in with google</button> </a>
              <input type="radio" name="freq" defaultValue="Monthly" />
              Monthly<br />
              <a href="#close" title="Close" className="close">
                <input type="Button" name="submit" defaultValue="Submit" />
                <input type="Button" defaultValue="Exit" />
              </a>
            </form>
          </div>
        </div>
      </div>
    )

  }
}
