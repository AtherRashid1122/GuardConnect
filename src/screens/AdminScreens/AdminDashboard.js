import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';
const AdminDashboard = ({ navigation }) => {
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{ marginLeft: 15 }}
                >
                    <Ionicons name="menu" size={24} color="#000" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdminProfile')}
                    style={{ marginRight: 15 }}
                >
                    <Ionicons name="person" size={24} color="#000" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    const stats = [
        { id: 1, title: 'Total Guards', value: '24' },
        { id: 2, title: 'Total Shifts', value: '18' },
        { id: 3, title: 'Pending Requests', value: '5' },
        { id: 4, title: 'Active Guards', value: '12' },
    ];
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text onPress={() => dispatch(logoutUser())} style={styles.welcome}>Welcome Back</Text>
                <Text style={styles.adminName}>Admin Dashboard</Text>
                <Text style={styles.subText}>Manage guards, shifts and requests</Text>
            </View>

            {/* Stats Cards */}
            <View style={styles.cardWrapper}>
                {stats.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardValue}>{item.value}</Text>
                    </View>
                ))}
            </View>

            {/* Quick Actions */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <View style={styles.actionWrapper}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('GuardsScreen', {
                        screen: 'GuardsLists',
                    })
                    }>
                    <Text style={styles.actionText}>Manage Guards</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('GuardsScreen', {
                        screen: 'AssignShiftScreen',
                    })
                    }
                >
                    <Text style={styles.actionText}>Manage Shifts</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('RequestScreen')}>
                    <Text style={styles.actionText}>View Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('AdminProfile')}>
                    <Text style={styles.actionText}>Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Recent Activity */}
            <Text style={styles.sectionTitle}>Recent Activity</Text>

            <View style={styles.activityBox}>
                <Text style={styles.activityText}>No recent activity yet</Text>
            </View>
        </ScrollView>
    );
};

export default AdminDashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8FB',
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    header: {
        marginBottom: 20,
    },
    welcome: {
        fontSize: 16,
        color: '#666',
    },
    adminName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111',
        marginTop: 4,
    },
    subText: {
        fontSize: 14,
        color: '#777',
        marginTop: 6,
    },

    cardWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 18,
        marginBottom: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    cardValue: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111',
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginTop: 10,
        marginBottom: 12,
    },

    actionWrapper: {
        marginBottom: 10,
    },
    actionButton: {
        backgroundColor: '#111',
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },

    activityBox: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 18,
        marginBottom: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    activityText: {
        fontSize: 14,
        color: '#666',
    },
});