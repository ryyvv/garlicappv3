import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    Animated,
} from 'react-native';


const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export default function Plant() {
    const scrollY = useRef(new Animated.Value(0)).current;

    const dataPlant = [
        {
            id: 1,
            title: 'The Hunger Games'
        },
        {
            id: 2,
            title: 'Harry Potter and the Order of the Phoenix'
        },
        {
            id: 3,
            title: 'To Kill a Mockingbird'
        },
        {
            id: 4,
            title: 'Pride and Prejudice'
        },
        {
            id: 5,
            title: 'Twilight'
        },
        {
            id: 6,
            title: 'The Book Thief'
        },
        {
            id: 7,
            title: 'The Chronicles of Narnia'
        },
        {
            id: 8,
            title: 'Animal Farm'
        },
        {
            id: 9,
            title: 'Gone with the Wind'
        },
        {
            id: 10,
            title: 'The Shadow of the Wind'
        },
        {
            id: 11,
            title: 'The Fault in Our Stars'
        },
        {
            id: 12,
            title: "The Hitchhiker's Guide to the Galaxy"
        },
        {
            id: 13,
            title: 'The Giving Tree'
        },
        {
            id: 14,
            title: 'Wuthering Heights'
        },
        {
            id: 15,
            title: 'The Da Vinci Code'
        }
    ]

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    });
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.9],
        extrapolate: 'clamp',
    });
    const titleTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
    });

    const renderListItem = (item) => (
        <View key={item.id} style={styles.card}>
            <Image style={styles.avatar} source={{ uri: item.avatar }} />
            <Text style={styles.fullNameText}>{item.fullName}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.saveArea}>
            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 0 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}>
                {dataPlant.map(item => (
                    <View key={item.id} style={{ marginBottom: 5, marginTop: 55 }}>
                        <Text style={{ color: '#101010', fontSize: 20 }}>
                            {item.title}
                        </Text>
                    </View>
                ))}
            </Animated.ScrollView>
            <Animated.View
                style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
                <Animated.Image
                    style={[
                        styles.headerBackground,
                        {
                            opacity: imageOpacity,
                            transform: [{ translateY: imageTranslateY }],
                        },
                    ]}
                    source={require('../../src/images/garlic2.png')}
                />
            </Animated.View>
            <Animated.View
                style={[styles.topBar, {
                    transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
                    marginBottom: 10
                },
                ]}>
                <View>
                    <View>
                        <Text>
                            My Plants
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        backgroundColor: '#eff3fb',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#402583',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        borderRadius: 10,
        marginHorizontal: 12,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#62d1bc',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    topBar: {
        marginTop: 40,
        height: 50,
        // alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 20,
    },
    avatar: {
        height: 54,
        width: 54,
        resizeMode: 'contain',
        borderRadius: 54 / 2,
    },
    fullNameText: {
        fontSize: 16,
        marginLeft: 24,
    },
});
