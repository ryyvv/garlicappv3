import React from 'react';
import {
    StyleSheet
} from 'react-native';

export default globalStyles = StyleSheet.create({



    // #235484  #3E7E55
    // #3271a5  #7ABD87
    // #3982b8  #AADCB6
    // #4194cb  #CADEC8
    // #46a2da  #EAEEE5
    // #58afdd  #CEE98E
    // #6abce2  #E1F5DA
    // #8dcfec  #C7D36F
    // #b8e2f4  #f2f2ee

    // #276653   Font1
    // #61bc91   Font2
    // #8eb4a9   Font3 subtitle
    // #f0f9f6   background1
    // #e3f3f0   background2
    // #cbdeda   Font3 textinput
    // #68bf95  icons
    // #64b690  Button1
    // #7ABD87  button2
    // 




    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'white',
        padding: 10
    },
    div2Row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    div2RowDatalist: {
        paddingTop: 13,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',

    },
    div2column: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    div2columnRecent: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'gray',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 25
    },
    div2columnPest: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10
    },

    div2RowSpaceBetween: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    div2RowSpaceEven: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    div2RowSpaceEvenNoAlignItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    // ===============================================

    cardDataPlant: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginBottom: 15,
    },
    cardDashboard: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 25,
        width: '100%',
        marginVertical: 10,
    },
    cardDashboardProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    cardProfile: {
        backgroundColor: 'white',
        borderRadius: 35,
        // paddingVertical: 25,
        padding: 15,
        marginVertical: 10,
        alignItems: 'baseline'
    },
    cardProfilePencil: {
        alignItems: 'left'
    },
    cardProfilepic: {
        backgroundColor: '#AADCB6',
        borderRadius: 50,
        // paddingVertical: 25,
        padding: 24,
        // marginVertical: 10,
        alignItems: 'center'
    },
    cardDashboardRecent: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginTop: 10,
        padding: 8,
    },
    cardDashboardRecentProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
    },
    cardDashboardweatherplantinfo: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginTop: 10,
        padding: 15,

    },
    cardDashboardweatherplantinfoinside: {
        backgroundColor: '#e3f3f0',
        borderRadius: 8,
        width: '100%',

    },
    cardDashboardForecast: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginTop: 5,
        padding: 15,
    },
    cardDashboardForecastProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
    },
    cardDashboardLocation: {
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        padding: 15,
    },
    cardDashboardLocationProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
    },
    cardDashboard1: {
        // backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 25,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 10,

    },
    overlay: {
        marginTop: 90,
        paddingTop: 90,
        height: 180,
        marginVertical: -280,

    },
    cardDashboardPest: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginVertical: 10,

    },
    cardDashboardPestProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },

    cardDashboardHourly: {
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 5,
        padding: 10,
        marginVertical: 10,
        width: '100%'
    },
    cardDashboardHourlyProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
    },
    dashboardAccountUser: {
        marginBottom: 25
    },
    dashboardforecast: {
        backgroundColor: '#FFFFFF',
    },
    imageuserViewsmall: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10
    },
    dashboardWeather: {
        marginLeft: 15,
        marginRight: 15,
    },
    dashboardPest: {
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
    },
    dashboardHourly: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    dashboardForecastDay: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    dashboardRecent: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        height: '100%'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#C7D36F',
        padding: 10,
        marginBottom: 20,
    },
    countContainer: {
        alignItems: 'center',
        padding: 10,
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    textLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        border: 2,
        borderColor: 'green',
        fontSize: 24,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    loginTextContainer: {
        marginTop: 7,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: -25,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: 'green',
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginToSign: {
        marginTop: 7,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: -25,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: 'green',
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTextinput: {
        flex: 1,
        fontSize: 14,
    },
    btnLogin: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 15,
        paddingTop: 15,
        marginTop: 15,
        borderRadius: 6,
    },
    textLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInput: {
        border: 2,
        borderColor: 'green',
        fontSize: 24,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    loginTextContainer: {
        marginTop: 7,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: -25,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: 'green',
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginToSign: {
        marginTop: 7,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: -25,
        paddingBottom: 5,
        borderRadius: 10,
        borderColor: 'green',
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTextinput: {
        flex: 1,
        fontSize: 14,
    },
    btnLogin: {
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 15,
        paddingTop: 15,
        marginTop: 15,
        borderRadius: 6,
    },

    // oct.16
    // ==============================================================

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    percent10: {
        width: '10%',
    },
    percent20: {
        width: '20%',
    },
    percent30: {
        width: '30%',
    },
    percent40: {
        width: '40%',
    },
    percent50: {
        width: '50%',
    },
    percent60: {
        width: '60%',

    },
    percent70: {
        width: '70%',

    },
    percent80: {
        width: '80%',
    },
    percent90: {
        width: '90%',
    },
    percent100: {
        width: '100%',
    },

    graycontainer: {
        // backgroundColor: '#f2f2ee',
        padding: 10,
    },
    cardPlantWrapper: {
        position: 'relative',
    },
    cardPlantZindex1: {
        zIndex: 1,
        position: 'absolute',
        // top:13,
    },
    cardPlantZindex2: {
        zIndex: 2,
        position: 'absolute',
        // top:15,
    },
    cardPlantZindex3: {
        zIndex: 3,
        position: 'absolute',
        // top:25,
    },
    cardPlant: {
        backgroundColor: '#FFFF',
        borderRadius: 8,
        paddingVertical: 25,
        width: '100%',
        padding: 10
    },
    cardPlantProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
    },
    cardPlantRecent: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginTop: 10,
        padding: 8,
    },
    cardDashboardRecentProp: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 7,
    },
    plantTake: {
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#CEE98E',
        padding: 13,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ffff',
    },
    plantUpload: {
        marginTop: 5,
        borderRadius: 30,
        backgroundColor: '#CEE98E',
        padding: 13,
        paddingLeft: 18,
        paddingRight: 18,
        color: '#ffff',

    },
    accountcontainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    profileinput: {
        fontSize: 14,
        paddingLeft: 13,
        paddingRight: 13,
        padding: 2,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#8eb4a9',
    },
    profileTextIcon: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#8eb4a9',
        paddingLeft: 13,
        paddingRight: 5,
        marginTop: 5,
    },
    profileTextinput: {
        width: '85%',
        fontSize: 16,
        color: '#276653',
        fontWeight: 'bold'
    },
    searchTextinput: {
        fontSize: 16,
        color: '#8eb4a9',
    },
    dataSyncicon: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#AADCB6',
        paddingLeft: 5,
        paddingRight: 5,
        padding: 5,
        backgroundColor: '#AADCB6'

    },
    profilelogoutbutton: {
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#AADCB6',
        paddingLeft: 45,
        paddingRight: 45,
        padding: 8,
        backgroundColor: 'white'
    },
    cardprofile: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
    },
    cardprofileicon: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    cardprofileicon: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    searchbar: {
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#276653',
        padding: 4,

        paddingRight: 10,
        backgroundColor: 'white'
    },
    cardCamera: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        width: '40%',
        paddingVertical: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    cardCameraProps: {
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
    },
    textCamera: {
        marginTop: 10,
        padding: 7,
        borderRadius: 5,
        backgroundColor: '#AADCB6',
        fontWeight: 'bold',
        color: '#276653',
    },

    textCam: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 13,
        color: '#276653',
    },
    textCamTitle: {
        marginVertical: 10,
        // marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#276653',
    },

    // Modal
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    addBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7ABD87',
        position: 'absolute',
        bottom: 20,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }



});
