import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet,Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const { width, height } = Dimensions.get('window')
function SvgTop() {

    return (
        <Svg
            width={500}
            height={324}
            fill="none"

        >
            <Path
                d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
                fill="url(#prefix__paint0_linear_103:6)"
                fillOpacity={1}
            />
            <Path
                d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
                fill="url(#prefix__paint1_linear_103:6)"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_103:6"
                    x1={492.715}
                    y1={231.205}
                    x2={480.057}
                    y2={364.215}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FED8F7" />
                    <Stop offset={1} stopColor="#C4DDFE" />
                </LinearGradient>
                <LinearGradient
                    id="prefix__paint1_linear_103:6"
                    x1={7.304}
                    y1={4.155}
                    x2={144.016}
                    y2={422.041}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#C4DDFE" />
                    <Stop offset={1} stopColor="#FED8F7" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
    // #ed365b
    // #DC143C
}


export default SvgTop

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});