import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export default function BottomSheet() {
    const refRBSheet = useRef();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red"
            }}
        >
            <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeDuration={600}
                openDuration={600}
                // minClosingHeight={310}
                height={300}
                animationType={'fade'}
                customStyles={{
                    wrapper: {
                        // backgroundColor: "transparent",
                        backgroundColor: 'gray'

                    },
                    draggableIcon: {
                        backgroundColor: "#000",


                    },
                    container: {
                        borderRadius: 20,
                    }
                }}
                style={{
                    borderRadius: 20,
                }}>
                <View style={{
                    backgroundColor: 'blue'
                }}>
                    <Text>
                        fsdfsdf
                    </Text>
                </View>
            </RBSheet>
        </View >
    );
}