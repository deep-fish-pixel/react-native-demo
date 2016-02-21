/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict';


var React = require('react-native');
var {
    PixelRatio,
    Navigator,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    } = React;

import navigationMixin from './navigationMixin';
import util from './../util';
import styles from './../../style/lib/navigationBarStyle';

class NavButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

var NavigationBarRouteMapper = {

    LeftButton: function (route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {previousRoute.title}
                </Text>
            </TouchableOpacity>
        );
    },

    RightButton: function (route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => navigator.push(newRandomRoute())}
                style={styles.navBarRightButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    Next
                </Text>
            </TouchableOpacity>
        );
    },

    Title: function (route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },

};

function newRandomRoute() {
    return {
        title: '#' + Math.ceil(Math.random() * 1000),
    };
}

var NavigationBar = React.createClass({

    mixins:[navigationMixin],

    getDefaultProps: function () {

    },

    componentWillMount: function () {
        var initialRoute = this.props.initialRoute;
        this.push(initialRoute);

        var navigator = this.props.navigator;

        var callback = (event) => {
            console.log(
                `NavigationBar : event ${event.type}`,
                {
                    route: JSON.stringify(event.data.route),
                    target: event.target,
                    type: event.type,
                }
            );
        };

        // Observe focus change events from this component.

        if(navigator){
            this._listeners = [
                navigator.navigationContext.addListener('willfocus', callback),
                navigator.navigationContext.addListener('didfocus', callback),
            ];
        }
    },

    componentWillUnmount: function () {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },

    render: function () {
        var initialRoute = this.props.initialRoute;
        return (
            <Navigator
                debugOverlay={false}
                initialRoute={initialRoute}
                renderScene={(route, navigator) => (
                    this.renderScene(route, navigator)
                )}
                navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={NavigationBarRouteMapper}
                    style={styles.navBar}
                  />
                }
            />
        );
    },

});


module.exports = NavigationBar;
