import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'


const Filters = ({ data, onValueChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <View style={{ flexDirection: 'row' }}>
            {data.map((x, i) => (
                <FilterButton
                    key={i + 'filterbutton'}
                    text={x.title}
                    id={x.title}
                    selectedIndex={selectedIndex}
                    callback={(id) => {
                        setSelectedIndex(id);
                        if (onValueChange) {
                            onValueChange(id);
                        }
                    }}
                />
            ))}
        </View>
    );
};

const FilterButton = ({ callback, text, id, selectedIndex }) => {
    const clicked = selectedIndex === id;
    return (
        <TouchableOpacity
            style={[
                { borderRadius: 12, borderColor: 'black', borderWidth: 1, borderColor:'#C4C3C7',
                 padding: 4 , paddingLeft:6, paddingRight:6,marginRight:2 },
                { backgroundColor: clicked ? '#01133F' : '#f5f4f9' },
            ]}
            onPress={() => {
                callback(id);
            }}>
            <Text style={{ color: clicked ? '#ededed' : '#646166' }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Filters