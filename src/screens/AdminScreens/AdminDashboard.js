import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch()

    return (
        <View>
            <TouchableOpacity>
                <Text>Home Screen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AdminDashboard

const styles = StyleSheet.create({})