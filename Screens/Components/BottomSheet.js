import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

const BottomSheet = () => {
    const gestureHandler = useAnimatedGestureHandler({})

    // ref
    const bottomSheetModalRef = useRef < BottomSheetModal > (null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((number) => {
        console.log('handleSheetChanges', number);
    }, []);

    // renders
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ margin: 10, padding: 10, borderColor: '#7ABD87', backgroundColor: '#AADCB6' }}
            >
                <Text>Modal Button</Text>
            </TouchableOpacity>


            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                </Animated.View>
            </PanGestureHandler>
        </View >


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomSheet;