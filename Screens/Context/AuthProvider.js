import React, { createContext, useState } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
// import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUsers] = useState(null);
    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    setUsers,
                    login: async (email, password) => {
                        try {
                            await auth().signInWithEmailAndPassword(email, password);
                        } catch (e) {
                            console.error(e);
                            alert(e)
                        }
                    },
                    forgotPassword: async (email) => {
                        try {
                            await auth().sendPasswordResetEmail(email);
                            alert('Password reset email sent successfully');
                        } catch (e) {
                            console.error(e);
                        }
                    },
                    register: async (email,name, address,  password) => {
                        try {
                            await auth().createUserWithEmailAndPassword(email, password);
                        } catch (e) {
                            console.error(e);
                        }

                        console.log('Registered user info: ' + auth().currentUser.uid)
                        let userUid = auth().currentUser.uid
                        let now = moment().utcOffset(15.2).format('l');

                        database()
                            .ref('users/' + userUid +'/userData')
                            .set({
                                userid: userUid,
                                name: name,
                                email: email,
                                address: address,
                                dataSync: now,
                                userProfile: 'icon',
                                message: 'Connected',
                                DateCreated: now,

                            }).then(() => {
                                console.log('user added to RDatabase')
                            });
                           alert('Please complete your user info to settings')


                    },
                    logout: async () => {
                        try {
                            await auth().signOut().then(() => console.log('User signed out!'));
                        } catch (e) {
                            console.error(e);
                        }
                    },

                }

            }
        >
            {children}
        </AuthContext.Provider>
    );

}