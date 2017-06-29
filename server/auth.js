const app = require('APP'), { env } = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')
const secrets = {}
const { User, OAuth } = require('APP/db')
console.log('*********', User)
const auth = require('express').Router()
const cors = require('cors')
/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm run dev
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: secrets.FACEBOOK_CLIENT_ID,
    clientSecret: secrets.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/facebook`,
  },
  passport
})



// Google needs the GOOGLE_CLIENT_SECRET AND GOOGLE_CLIENT_ID
// environment variables.


auth.use(cors())
auth.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: secrets.GOOGLE_CLIENT_ID,
    clientSecret: secrets.GOOGLE_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/google`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: secrets.GITHUB_CLIENT_ID,
    clientSecret: secrets.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport
})

// Other passport configuration:
// Passport review in the Week 6 Concept Review:
// https://docs.google.com/document/d/1MHS7DzzXKZvR6MkL8VWdCxohFJHGgdms71XNLIET52Q/edit?usp=sharing
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        if (!user) debug('deserialize retrieved null user for id=%d', id)
        else debug('deserialize did ok user.id=%d', id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)


auth.get('/whoami', (req, res) => res.send(req.user))

// POST requests for local login:
// maybe add a fail redirect to a signup page?
auth.post('/login/local', (req, res, next) => {
  const { email, password } = req.body;
  console.log('email:', email, 'password:', password, req.body)
  User.findOne({
    where: { email },
    attributes: { include: ['password_digest'] }
  })
    .then(user => {
      if (!user) {
        debug('authenticate user(email: "%s") did fail: no such user', email)
        throw new Error('one')
      }
      return user.authenticate(password).then(ok => {
        if (!ok) {
          debug('authenticate user(email: "%s") did fail: bad password')
          throw new Error('two')
        }
        debug('authenticate user(email: "%s") did ok: user.id=%d', email, user.id)
        req.logIn(user, function (err) {
          if (err) { throw next('three') }
          return res.redirect('/')
        })
      })
    })
    .catch(next)
})
auth.post('/login/local', () => {

  return passport.authenticate('local', { successRedirect: '/' })
})

auth.post('/signup', (req, res, next) => {
  console.log("we are getting in here", req.body)
  User.findOne({
    where: {
      email: req.body.email,

    }
  })
    .then((user) => {

      if (user !== null) {
        console.log("user exists")
        res.end()
      } else {
        console.log("creating user")
         User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
        )
          .then(user => {
            console.log("user", user)
            return req.logIn(user, (err) => {
              if (err) { return next(err) }
            })
          })
          .then(() => res.redirect('/'))
          .catch(next)
      }
    })
})


// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/login/:strategy', (req, res, next) => {
  console.log('in AUTH DOT GET', req.params.strategy)
  console.log(secrets.GOOGLE_CLIENT_ID, "!!!!SFSFSFS")
  passport.authenticate(req.params.strategy, {

    scope: 'email', // You may want to ask for additional OAuth scopes. These are
    // provider specific, and let you access additional data (like
    // their friends or email), or perform actions on their behalf.
    successRedirect: '/',
    failureRedirect: '/somewhere'
    // Specify other config here
  }, function (err, user, info){
    console.log("usaaaaaa", user)
    if (err) return next(err)
    if(!user) return res.redirect('http://www.google.com') //copied this from passport docs
    req.login(user, function(err){
      if (err) return next(err)
      res.redirect('/')
      User.create({
        name: user.name,
        googleId : id
      })
    })
  })(req, res, next)
}
)

auth.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
