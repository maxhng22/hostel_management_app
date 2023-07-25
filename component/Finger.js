// import React, { Component } from "react";
// import { StyleSheet, View, /*ART,*/ Dimensions } from "react-native";
// const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

// const Particle = (props) => {
//   const size = HEIGHT * 0.002 * props.size
//   const x = props.position[0] - size / 2;
//   const y = props.position[1] - size / 2;
//   return (
//     <View
//       style={
//         {
//           borderRadius: size,
//           position: "absolute",
//           left: x,
//           top: y,
//           width: size,
//           height: size,
//           backgroundColor:props.color
//         }
//       }
//     />
//   );
// }


// const ParticleSystem = (props) => {
//   return (
//     <View>
//       {props.particles.map((p, i) => (
//         <Particle
//           key={i}
//           position={p.position}
//           color={p.color}
//           size={p.size}
//         />
//       ))}
//     </View>
//   );

// }


// export {
//   Particle,
//   ParticleSystem,
// };