// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default login page e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL + '/about'

    console.log(devServer)

    browser
      .url(devServer)
      .waitForElementVisible('button', 5000)
      .assert.value('input[name=email]', 'hho@test.com')
      .assert.value('input[name=password]', 'password')
      // .assert.elementPresent('.hello')
      .assert.containsText('button', 'LOGIN')
      // .assert.elementCount('img', 1)
      .end()
  }
}
